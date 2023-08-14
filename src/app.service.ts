import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { MessageDto } from './dto /message.dto';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import { exec } from 'aws-cdk/lib';
import { AwsCdkService } from './global/aws-cdk.service';
import * as fs from 'fs';
import { Ec2InstanceStack } from './lib/ec2/Ec2InstanceStack';
import { ApplicationLoadBalancerStack } from './lib/ec2/application-load-balancer-stack';
import { RdsInstanceStack } from './lib/rds/rds-instance-stack';

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
    await exec(['synth', '--require-approval', 'never']);
    return 'hello';
  }
}
