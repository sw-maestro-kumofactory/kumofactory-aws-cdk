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
@Injectable()
export class AppService {
  constructor(@Inject('CDK_SERVICE') private readonly client: ClientProxy) {}
  async getHello(): Promise<string> {
    await this.client.connect();

    return 'Hello World!';
  }

  async accumulate(): Promise<Observable<number>> {
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];
    this.client.send<number>(pattern, payload);
    return;
  }

  async synthCdk(data: MessageDto[]) {
    const scope = new cdk.App();
    const ec2InstanceIds: string[] = [];

    await Promise.all(
      data.map(async (cdkData) => {
        switch (cdkData.type) {
          case AwsComponentType.EC2:
            const result = await this.callEc2Stack(
              scope,
              cdkData.id,
              cdkData.options,
            );
            ec2InstanceIds.push(result.getInstanceId());
            break;
          case AwsComponentType.ALB:
            const albOptions = {
              ...cdkData.options,
              instancesIds: ec2InstanceIds,
            };
            await this.callAlbStack(scope, cdkData.id, albOptions);
            break;
        }
      }),
    );

    return scope.synth();
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
