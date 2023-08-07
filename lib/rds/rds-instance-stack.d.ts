import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { RdsStackType } from "../../src/rds/type/rds-stack.type";
export declare class RdsInstanceStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: cdk.StackProps, options: RdsStackType);
}
