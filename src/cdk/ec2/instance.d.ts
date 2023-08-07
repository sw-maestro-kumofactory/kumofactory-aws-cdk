import { Construct } from "constructs";
import { Ec2StackOption } from "./type/instance.type";
import * as ec2 from "aws-cdk-lib/aws-ec2";
export declare const createNewInstance: (scope: Construct, props: Ec2StackOption) => ec2.Instance;
export declare const getInstanceByInstanceIds: (instanceIds: [string]) => Promise<import("@aws-sdk/client-ec2").DescribeInstancesCommandOutput>;
