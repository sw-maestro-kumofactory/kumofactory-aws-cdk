import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RdsStackType } from '../../cdk/rds/type/rds-stack.type';
import { createRDSInstance } from '../../cdk/rds/RDSInstance';
import { CfnOutput } from 'aws-cdk-lib';

export class RdsInstanceStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    options: RdsStackType,
    props: cdk.StackProps,
  ) {
    super(scope, id, props);
    const databaseInstance = createRDSInstance(this, options);
    new CfnOutput(this, 'uuid', {
      value: options.instance.id,
    });
    new CfnOutput(this, 'instanceId', {
      value: databaseInstance.instanceResourceId,
    });
    new CfnOutput(this, 'endpoint', {
      value: databaseInstance.dbInstanceEndpointAddress,
    });
    new CfnOutput(this, 'port', {
      value: databaseInstance.dbInstanceEndpointPort,
    });
  }
}
