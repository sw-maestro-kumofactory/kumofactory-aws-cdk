import { Inject, Injectable, StreamableFile } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { MessageDto } from './dto /message.dto';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import { exec } from 'aws-cdk/lib';
import { AwsCdkService } from './global/aws-cdk.service';
import * as fs from 'fs';
import * as path from 'path';
import * as AWS from 'aws-sdk';
import { InjectModel } from '@nestjs/mongoose';
import { Instance } from './domain/instance.schema';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { CfnOutput } from './domain/cfn-output.schema';

@Injectable()
export class AppService {
  constructor(
    @Inject('CDK_SERVICE') private readonly client: ClientProxy,
    private readonly awsCdkService: AwsCdkService,
    @InjectModel(Instance.name) private instanceModel: Model<Instance>,
    private readonly httpService: HttpService,
    @InjectModel(CfnOutput.name) private cfnOutputModel: Model<CfnOutput>,
  ) {}

  private readonly app: cdk.App = new cdk.App();

  async getHello(): Promise<string> {
    const output = await this.cfnOutputModel
      .findOne({
        key: '435712ea-af46-4678-8912-ef8d643f262a',
      })
      .exec();

    console.log(output);
    return 'helloworld';
  }

  async synthCdk(data: MessageDto[]) {
    const [key, ...dat] = data;
    const blueprintUuid = key.id;
    await this.deleteFolderRecursive('cdk.out');
    console.log(dat);
    // file write
    fs.writeFileSync('t.json', JSON.stringify(dat).toString());
    // execute
    await exec([
      'deploy',
      '--all',
      '--require-approval',
      'never',
      '--outputs-file',
      `./outputs.json`,
    ]);
    // 데이터 저장
    await this.saveOutput(blueprintUuid);
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
}
