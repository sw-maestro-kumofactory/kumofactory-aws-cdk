import { Inject, Injectable } from '@nestjs/common';
import { SUBSCRIBE } from '@nestjs/microservices/constants';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { Message } from '@nestjs/microservices/external/kafka.interface';
import { Observable } from 'rxjs';
import { MessageDto } from './dto /message.dto';
import { Ec2InstanceStack } from '../lib/ec2/Ec2InstanceStack';
import { Construct } from 'constructs';
import { ApplicationLoadBalancerStack } from '../lib/ec2/application-load-balancer-stack';
import { RdsInstanceStack } from '../lib/rds/rds-instance-stack';
import { AwsComponentType } from './type/aws-component.type';
import * as cdk from 'aws-cdk-lib';
import { exec } from 'aws-cdk/lib';
import { AwsCdkService } from './global/aws-cdk.service';
import * as fs from 'fs';
import { AwsConfigureService } from './global/aws-configure.service';
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
    // file write
    fs.writeFileSync('t.json', JSON.stringify(data).toString());
    // execute
    await exec(['deploy', '--require-approval never']);
    return 'hello';
    return 'hello';
  }

  async callEc2Stack(scope: Construct, id: string, option: any) {
    return new Ec2InstanceStack(scope, id, option, {
      env: { account: '434126037102', region: 'ap-northeast-2' },
    });
  }

  async callAlbStack(scope: Construct, id: string, option: any) {
    return new ApplicationLoadBalancerStack(scope, id, option, {
      env: { account: '434126037102', region: 'ap-northeast-2' },
    });
  }

  async callRdsStack(scope: Construct, id: string, options: any) {
    return new RdsInstanceStack(scope, id, options, {
      env: { account: '434126037102', region: 'ap-northeast-2' },
    });
  }
}
