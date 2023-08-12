import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RdsStackType } from '../../cdk/rds/type/rds-stack.type';
import { createRDSInstance } from '../../cdk/rds/RDSInstance';

export class RdsInstanceStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    options: RdsStackType,
    props: cdk.StackProps,
  ) {
    super(scope, id, props);
    createRDSInstance(this, options);
  }
}
