import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as secretManager from 'aws-cdk-lib/aws-secretsmanager';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

import { getVpc } from '../ec2/vpc';
import { getSecurityGroup } from '../ec2/security-group';
import { AccessScopeType } from '../ec2/type/instance.type';
import { MysqlEngineVersion } from 'aws-cdk-lib/aws-rds';
import { randomUUID } from 'crypto';
import { MySqlEngineVersionType } from './type/RDSInstance.type';
import { RdsStackType } from './type/rds-stack.type';

export const createRDSInstance = (scope: Construct, options: RdsStackType) => {
  const { secret, instance } = options;
  const mySecret = new secretManager.Secret(
    scope,
    secret.id ?? 'a' + randomUUID(),
    {
      secretName: 'MyRDSDBCredentials', // Replace with your preferred secret name
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          username: secret.username ?? 'admin', // Replace with your RDS username
          password: secret.password ?? 'qwer1234',
        }),
        generateStringKey: 'password',
        excludePunctuation: true,
        excludeCharacters: '"@/\\',
      },
    },
  );

  const rdsInstance = new rds.DatabaseInstance(scope, instance.id, {
    vpc: getVpc(scope),
    engine: rds.DatabaseInstanceEngine.mysql({
      version: convertMysqlVersion(instance.version),
    }),
    instanceType: new ec2.InstanceType(instance.instanceType),
    instanceIdentifier:
      instance.instanceIdentifier ?? 'a' + Date.now().toString(16),
    databaseName: instance.databaseName,
    credentials: rds.Credentials.fromSecret(mySecret),
    securityGroups: [getSecurityGroup(scope, AccessScopeType.DATABASE)],
    removalPolicy: cdk.RemovalPolicy.DESTROY,
    deletionProtection: false,
    multiAz: false,
    subnetGroup: rds.SubnetGroup.fromSubnetGroupName(
      scope,
      'exisitingSubnetGroup',
      'kumofactory-db-subnet',
    ),
  });
};

const convertMysqlVersion = (version: MySqlEngineVersionType) => {
  switch (version) {
    case MySqlEngineVersionType.VER_8_0_33:
      return MysqlEngineVersion.VER_8_0_33;
    case MySqlEngineVersionType.VER_8_0_32:
      return MysqlEngineVersion.VER_8_0_32;
    case MySqlEngineVersionType.VER_8_0_31:
      return MysqlEngineVersion.VER_8_0_31;
    case MySqlEngineVersionType.VER_8_0_30:
      return MysqlEngineVersion.VER_8_0_30;
    case MySqlEngineVersionType.VER_8_0_28:
      return MysqlEngineVersion.VER_8_0_28;
    case MySqlEngineVersionType.VER_8_0_27:
      return MysqlEngineVersion.VER_8_0_27;
    case MySqlEngineVersionType.VER_8_0_26:
      return MysqlEngineVersion.VER_8_0_26;
    default:
      return MysqlEngineVersion.VER_8_0_33;
  }
};
