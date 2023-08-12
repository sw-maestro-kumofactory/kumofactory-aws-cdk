import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createRDSInstance } from '../../src/cdk/rds/RDSInstance';
import { RdsStackType } from '../../src/cdk/rds/type/rds-stack.type';
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
