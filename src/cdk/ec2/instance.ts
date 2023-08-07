import { Construct } from 'constructs';
import {
  AccessScope,
  AvailabilityZone,
  Ec2StackOption,
} from './type/instance.type';
import { getVpc } from './vpc';
import { getSecurityGroup } from './security-group';
import { getSubnet } from './subnet';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2';

export const createNewInstance = (scope: Construct, props: Ec2StackOption) => {
  const options = {
    ...props,
  };

  const vpc = getVpc(scope);
  const securityGroup = getSecurityGroup(scope, options.securityGroupType);
  const subnet = getSubnet(scope, options.subnetType, options.availabilityZone);
  return new ec2.Instance(scope, props.id, {
    vpc: vpc,
    instanceType: new ec2.InstanceType(options.instanceType),
    machineImage: ec2.MachineImage.latestAmazonLinux2023(),
    vpcSubnets: {
      subnets: [subnet],
    },
    securityGroup,
    ssmSessionPermissions: true,
    instanceName: props.instanceName,
  });
};

export const getInstanceByInstanceIds = async (instanceIds: [string]) => {
  const input = {
    InstanceIds: [...instanceIds],
  };
  const ec2Client = new EC2Client({
    region: 'ap-northeast-2',
  });
  const command = new DescribeInstancesCommand(input);
  return await ec2Client.send(command);
};
