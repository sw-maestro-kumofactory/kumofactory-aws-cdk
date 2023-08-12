import { Injectable } from '@nestjs/common';
import * as cdk from 'aws-cdk-lib';
import { Ec2InstanceStack } from '../lib/ec2/Ec2InstanceStack';
import {
  AccessScopeType,
  AvailabilityZoneType,
} from '../cdk/ec2/type/instance.type';
import { MessageDto } from '../dto /message.dto';
import { AwsComponentType } from '../type/aws-component.type';
import { Construct } from 'constructs';

import * as fs from 'fs';
import { ApplicationLoadBalancerStack } from '../lib/ec2/application-load-balancer-stack';
import { RdsInstanceStack } from '../lib/rds/rds-instance-stack';

@Injectable()
export class AwsCdkService {
  constructor() {}

  public static app: cdk.App = new cdk.App();
}

// AwsCdkService.init(AwsCdkService.getData([]));

// 1. class 안에 static 변수를 넣고 이 변수를 synthCdk() 함수 내에서 값을 할당
// 2. init() 얘를 synthCdk() 에서 호출

export async function init() {
  const ec2InstanceIds: any[] = [];
  const jsonData = fs.readFileSync('t.json', 'utf8');
  if (!jsonData) return 0;
  const parsedData = JSON.parse(jsonData);
  const app = AwsCdkService.app;

  console.log(
    '===================== Create Stack ==============================',
  );
  if (Array.isArray(parsedData)) {
    await Promise.all([
      parsedData.map(async (cdkData) => {
        switch (cdkData.type) {
          case AwsComponentType.EC2:
            const result = await callEc2Stack(app, cdkData.id, cdkData.options);
            ec2InstanceIds.push(result.getInstanceId());
            break;
        }
      }),
    ]);

    await Promise.all([
      parsedData.map(async (cdkData) => {
        switch (cdkData.type) {
          case AwsComponentType.ALB:
            const albOptions = {
              ...cdkData.options,
              instances: ec2InstanceIds,
            };
            await callAlbStack(app, cdkData.id, albOptions);
            break;
        }
      }),
    ]);
  }
  console.log(
    '===================== Done Stack ==============================',
  );
  fs.writeFileSync('t.json', '');
  console.log(
    '===================== Clear Json File ==============================',
  );
  return app.synth();
}

init();

function callEc2Stack(scope: Construct, id: string, option: any) {
  return new Ec2InstanceStack(scope, id, option, {
    env: { account: '434126037102', region: 'ap-northeast-2' },
  });
}

function callAlbStack(scope: Construct, id: string, option: any) {
  console.log(option);
  return new ApplicationLoadBalancerStack(scope, id, option, {
    env: { account: '434126037102', region: 'ap-northeast-2' },
  });
}

function callRdsStack(scope: Construct, id: string, options: any) {
  return new RdsInstanceStack(scope, id, options, {
    env: { account: '434126037102', region: 'ap-northeast-2' },
  });
}
