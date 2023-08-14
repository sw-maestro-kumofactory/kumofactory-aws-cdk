import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { MessageDto } from './dto /message.dto';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import { exec } from 'aws-cdk/lib';
import { AwsCdkService } from './global/aws-cdk.service';
import * as fs from 'fs';
import * as path from 'path';
import * as AWS from 'aws-sdk';

@Injectable()
export class AppService {
  constructor(
    @Inject('CDK_SERVICE') private readonly client: ClientProxy,
    private readonly awsCdkService: AwsCdkService,
  ) {}

  private readonly app: cdk.App = new cdk.App();

  async getHello(): Promise<string> {
    await this.client.connect();

    return 'Hello World!';
  }

  async synthCdk(data: MessageDto[]) {
    console.log(`in Service ${JSON.stringify(data)}`);
    await this.deleteFolderRecursive('cdk.out');
    // file write
    fs.writeFileSync('t.json', JSON.stringify(data).toString());
    // execute
    await exec(['deploy', '--all', '--require-approval', 'never']);
    return 'hello';
  }

  // 폴더 삭제 함수
  async deleteFolderRecursive(folderPath: string) {
    if (fs.existsSync(folderPath)) {
      fs.readdirSync(folderPath).forEach((file) => {
        const curPath = path.join(folderPath, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          // 재귀적으로 폴더 내 파일 및 하위 폴더 삭제
          this.deleteFolderRecursive(curPath);
        } else {
          // 파일 삭제
          fs.unlinkSync(curPath);
        }
      });
      // 폴더 삭제
      fs.rmdirSync(folderPath);
      console.log(`Deleted folder: ${folderPath}`);
    } else {
      console.log(`Folder not found: ${folderPath}`);
    }
  }
}
