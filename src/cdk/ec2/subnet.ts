import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import {
  AccessScope,
  AccessScopeType,
  AvailabilityZone,
  AvailabilityZoneType,
} from './type/instance.type';

export const getSubnet = (
  scope: Construct,
  type: AccessScope,
  availabilityZone: AvailabilityZone,
) => {
  switch (type) {
    case AccessScopeType.PUBLIC:
      return availabilityZone === AvailabilityZoneType.AP_NORTHEAST_2A
        ? getPublicSubnet01(scope)
        : getPublicSubnet02(scope);
    case AccessScopeType.PRIVATE:
      return availabilityZone === AvailabilityZoneType.AP_NORTHEAST_2A
        ? getPrivateSubnet01(scope)
        : getPrivateSubnet02(scope);
    case AccessScopeType.DATABASE:
      return availabilityZone === AvailabilityZoneType.AP_NORTHEAST_2A
        ? getDatabaseSubnet01(scope)
        : getDatabaseSubnet02(scope);
  }
};

const getPublicSubnet01 = (scope: Construct) => {
  return ec2.Subnet.fromSubnetAttributes(scope, 'PublicSubnet01', {
    availabilityZone: 'ap-northeast-2a',
    subnetId: 'subnet-043aec505f84e38ac',
  });
};

const getPublicSubnet02 = (scope: Construct) => {
  return ec2.Subnet.fromSubnetAttributes(scope, 'PublicSubnet02', {
    availabilityZone: 'ap-northeast-2c',
    subnetId: 'subnet-07c1a5153af279dab',
  });
};

const getPrivateSubnet01 = (scope: Construct) => {
  return ec2.Subnet.fromSubnetAttributes(scope, 'PrivateSubnet01', {
    availabilityZone: 'ap-northeast-2a',
    subnetId: 'subnet-08ad678f10d1751f9',
  });
};

const getPrivateSubnet02 = (scope: Construct) => {
  return ec2.Subnet.fromSubnetAttributes(scope, 'PrivateSubnet02', {
    availabilityZone: 'ap-northeast-2c',
    subnetId: 'subnet-083b485efbc75aee3',
  });
};

const getDatabaseSubnet01 = (scope: Construct) => {
  return ec2.Subnet.fromSubnetAttributes(scope, 'DatabaseSubnet01', {
    availabilityZone: 'ap-northeast-2a',
    subnetId: 'subnet-0ae4bdd1cd591ffc2',
  });
};

const getDatabaseSubnet02 = (scope: Construct) => {
  return ec2.Subnet.fromSubnetAttributes(scope, 'DatabaseSubnet01', {
    availabilityZone: 'ap-northeast-2c',
    subnetId: 'subnet-0479679bc8347e57e',
  });
};
