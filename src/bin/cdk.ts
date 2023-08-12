#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStack } from '../lib/cdk-stack';
import { HelloCdkStack } from '../lib/S3Stack';
import { Ec2InstanceStack } from '../lib/ec2/Ec2InstanceStack';
import {
  AccessScope,
  AccessScopeType,
  AvailabilityZone,
  AvailabilityZoneType,
} from '../cdk/ec2/type/instance.type';
import { LoadBalancerType } from '../cdk/ec2/type/loadbalancer.type';
import { ApplicationLoadBalancerStack } from '../lib/ec2/application-load-balancer-stack';
import { RdsInstanceStack } from '../lib/rds/rds-instance-stack';

const app = new cdk.App();
const env = {
  account: '434126037102',
  region: 'ap-northeast-2',
};

// new RdsInstanceStack(app, "newInstance3", {env});

const ec2InstanceStack1 = new Ec2InstanceStack(
  app,
  'aa',
  {
    instanceType: 't3.micro', // ex) t2.micro
    machineImage: 'linux', // amazon linux 2023
    subnetType: AccessScopeType.PUBLIC,
    availabilityZone: AvailabilityZoneType.AP_NORTHEAST_2A,
    instanceName: 'instance1',
    securityGroupType: AccessScopeType.PUBLIC,
    id: 'a',
  },
  { env },
);

const ec2InstanceStack2 = new Ec2InstanceStack(
  app,
  'a1',
  {
    instanceType: 't3.micro', // ex) t2.micro
    machineImage: 'linux', // amazon linux 2023
    subnetType: AccessScopeType.PUBLIC,
    availabilityZone: AvailabilityZoneType.AP_NORTHEAST_2C,
    instanceName: 'instance2',
    securityGroupType: AccessScopeType.PUBLIC,
    id: 'a1',
  },
  { env },
);

const albOptions: LoadBalancerType = {
  healthCheckPath: '/',
  id: 'a2',
  instances: [],
  listenerId: 'a2',
  name: 'qwiorjio32',
  port: 80,
  targetGroupId: 'a2',
  targetGroupName: 'hellogroup2',
  targetGroupPort: 8080,
};

new ApplicationLoadBalancerStack(app, 'a3', albOptions, {
  env,
});

app.synth();

// new Ec2InstanceStack(app, "TestInstance3", {env}, {
//     instanceType: "t3.micro", // ex) t2.micro
//     machineImage: "linux", // amazon linux 2023
//     subnetType: AccessScope.Private,
//     availabilityZone: AvailabilityZone.AP_NORTHEAST_2A,
//     instanceName: "hello new instance",
//     securityGroupType: AccessScope.Private,
//     id: "Private Instance1"
// });
//
// new Ec2InstanceStack(app, "TestInstance4", {env}, {
//     instanceType: "t3.micro", // ex) t2.micro
//     machineImage: "linux", // amazon linux 2023
//     subnetType: AccessScope.Private,
//     availabilityZone: AvailabilityZone.AP_NORTHEAST_2C,
//     instanceName: "hello new instance",
//     securityGroupType: AccessScope.Private,
//     id: "Private Instance2"
// });
