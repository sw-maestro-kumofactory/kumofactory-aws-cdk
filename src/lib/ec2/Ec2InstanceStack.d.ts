import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from "constructs";
import { Ec2StackOption } from "../../src/ec2/type/instance.type";
export declare class Ec2InstanceStack extends cdk.Stack {
    private readonly instance;
    constructor(scope: Construct, id: string, props: cdk.StackProps, options: Ec2StackOption);
    getInstance(): ec2.Instance;
    getInstanceId(): string;
}
