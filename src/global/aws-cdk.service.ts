import { Injectable } from '@nestjs/common';
import * as cdk from 'aws-cdk-lib';
import { Ec2InstanceStack } from '../../lib/ec2/Ec2InstanceStack';
import {
  AccessScopeType,
  AvailabilityZoneType,
} from '../cdk/ec2/type/instance.type';
import { MessageDto } from '../dto /message.dto';
import { AwsComponentType } from '../type/aws-component.type';
import { Construct } from 'constructs';
import { ApplicationLoadBalancerStack } from '../../lib/ec2/application-load-balancer-stack';
import { RdsInstanceStack } from '../../lib/rds/rds-instance-stack';
import { AwsConfigureService } from './aws-configure.service';
import * as fs from 'fs';

@Injectable()
export class AwsCdkService {
  constructor(private readonly configure: AwsConfigureService) {}
  public static app: cdk.App = new cdk.App();
}

// AwsCdkService.init(AwsCdkService.getData([]));

// 1. class 안에 static 변수를 넣고 이 변수를 synthCdk() 함수 내에서 값을 할당
// 2. init() 얘를 synthCdk() 에서 호출

export function init() {
  const jsonData = fs.readFileSync('t.json', 'utf8');
  if (!jsonData) return 0;
  const parsedData = JSON.parse(jsonData);
  const app = AwsCdkService.app;
  const env = {
    account: '434126037102',
    region: 'ap-northeast-2',
  };

  if (Array.isArray(parsedData)) {
    parsedData.map((cdkData) => {
      switch (cdkData.type) {
        case AwsComponentType.EC2:
          const result = callEc2Stack(app, cdkData.id, cdkData.options);
          // ec2InstanceIds.push(result.getInstanceId());
          break;
        case AwsComponentType.ALB:
          const albOptions = {
            ...cdkData.options,
          };
          // instancesIds: ec2InstanceIds,
          // await this.callAlbStack(app, cdkData.id, albOptions);
          break;
      }
    });
  }
  fs.writeFileSync('t.json', '');
  return app.synth();
}

init();

init();

function callEc2Stack(scope: Construct, id: string, option: any) {
  return new Ec2InstanceStack(scope, id, option, {
    env: { account: '434126037102', region: 'ap-northeast-2' },
  });
}

function callAlbStack(scope: Construct, id: string, option: any) {
  return new ApplicationLoadBalancerStack(scope, id, option, {
    env: { account: '434126037102', region: 'ap-northeast-2' },
  });
}

function callRdsStack(scope: Construct, id: string, options: any) {
  return new RdsInstanceStack(scope, id, options, {
    env: { account: '434126037102', region: 'ap-northeast-2' },
  });
}
