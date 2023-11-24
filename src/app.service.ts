import { Inject, Injectable, StreamableFile } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { MessageDto } from './dto/message.dto';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import { cli, exec } from 'aws-cdk/lib';
import { AwsCdkService } from './global/aws-cdk.service';
import * as fs from 'fs';
import * as path from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Instance } from './domain/instance.schema';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { CfnOutput } from './domain/cfn-output.schema';

import * as FormData from 'form-data';
import { lastValueFrom } from 'rxjs';
import { InfraCost } from './domain/infra-cost.schema';

@Injectable()
export class AppService {
  constructor(
    @Inject('CDK_SERVICE') private readonly client: ClientProxy,
    private readonly awsCdkService: AwsCdkService,
    @InjectModel(Instance.name) private instanceModel: Model<Instance>,
    private readonly httpService: HttpService,
    @InjectModel(CfnOutput.name) private cfnOutputModel: Model<CfnOutput>,
    @InjectModel(InfraCost.name) private infraCostModel: Model<InfraCost>,
  ) {}

  private readonly app: cdk.App = new cdk.App();

  async synthCdk(data: MessageDto[]) {
    const [key, ...dat] = data;
    const blueprintUuid = key.id;
    await this.deleteFolderRecursive('cdk.out');
    // file write
    fs.writeFileSync('t.json', JSON.stringify(dat).toString());


    try {
      await exec([
        'deploy',
        '--all',
        '--require-approval',
        'never',
        '--outputs-file',
        `./outputs.json`,
      ]);

//    cdk.out *.template.json
      const body = await this.getCost();
    
      await this.infraCostModel.findOneAndUpdate(
        { _id: blueprintUuid },
        { $set: { result: body } },
        { upsert: true, new: true }
      );
      
      await this.saveOutput(blueprintUuid);

    } catch (e) {
      console.error('From aws service', e);
      this.client
        .send('result', {
          id: blueprintUuid,
          status: 'FAIL',
        })
        .subscribe();
    }

    return 'hello';
  }

  // Output file 결과 저장하기
  async saveOutput(key: string) {
    const file = fs.readFileSync('./outputs.json', 'utf-8');
    const result = JSON.parse(file);
    const model = new this.cfnOutputModel({
      key: key,
      result: result,
    });
    fs.unlinkSync('./outputs.json');
    this.client
      .send('result', {
        id: key,
        status: 'SUCCESS',
      })
      .subscribe();
    return await model.save();
  }

  // 폴더 삭제 함수
  async deleteFolderRecursive(folderPath: string) {
    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, { recursive: true, force: true });
      console.log(`Deleted folder: ${folderPath}`);
    } else {
      console.log(`Folder not found: ${folderPath}`);
    }
  }

  async getCost() {
    const url = "https://oeejfb9dqe.execute-api.ap-northeast-2.amazonaws.com/default/infracost-lambda";

    const templateFile = await this.findTemplateFile();
    const formData = new FormData();
    formData.append('file', fs.createReadStream('./cdk.out/'+templateFile), {
      filename: templateFile,
      contentType: 'application/json',
    });

    try {
      const axiosResponse = this.httpService.post(url, formData, {
        headers: {
          ...formData.getHeaders(),
          'x-api-key': 'LTzz04tGiJ9Z3us7x4rqj9NIK7AGuCAS7VVUjs62',
        },
      });

      const response = await lastValueFrom(axiosResponse);

      return response.data;
    } catch (error) {
      console.error('Error sending file to API:', error);
      throw error;
    }
  }

  // cdk.out 폴더에 있는 .template.json 확장자를 가진 파일을 찾아 path를 반환하는 함수
  async findTemplateFile() {
    const files = fs.readdirSync('./cdk.out');
    const templateFile = files.find((file) => file.endsWith('.template.json'));
    return templateFile
  }

  async costCdk(data: MessageDto[]) {
    const [key, ...dat] = data;
    const blueprintUuid = key.id;
    await this.deleteFolderRecursive('cdk.out');
    // file write
    fs.writeFileSync('t.json', JSON.stringify(dat).toString());

    
    // print t.json
    console.log(JSON.stringify(dat).toString());

    //
    try {
      await exec(['synth']);
//    cdk.out *.template.json
      const body = await this.getCost();
      
      await this.infraCostModel.findOneAndUpdate(
        { _id: blueprintUuid },
        { $set: { result: body } },
        { upsert: true, new: true }
      );


    } catch (e) {
      console.error('From aws service', e);
      this.client
        .send('result', {
          id: blueprintUuid,
          status: 'FAIL',
        })
        .subscribe();
    }

    return 'hello';
  }
}
