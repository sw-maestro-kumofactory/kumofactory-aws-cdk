import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { AccessScope, AccessScopeType } from './type/instance.type';

export const getSecurityGroup = (scope: Construct, type: AccessScope) => {
  switch (type) {
    case AccessScopeType.PUBLIC:
      return getPublicSecurityGroup(scope);
    case AccessScopeType.PRIVATE:
      return getPrivateSecurityGroup(scope);
    case AccessScopeType.DATABASE:
      return getDatabaseSecurityGroup(scope);
  }
};

const getPublicSecurityGroup = (scope: Construct) => {
  return ec2.SecurityGroup.fromSecurityGroupId(
    scope,
    'PublicSg',
    'sg-0b21f621ed9a2ad0a',
  );
};

const getPrivateSecurityGroup = (scope: Construct) => {
  return ec2.SecurityGroup.fromSecurityGroupId(
    scope,
    'PrivateSg',
    'sg-047d0f165888ef03a',
  );
};

const getDatabaseSecurityGroup = (scope: Construct) => {
  return ec2.SecurityGroup.fromSecurityGroupId(
    scope,
    'DatabaseSg',
    'sg-08f4612bf68cf0451',
  );
};
