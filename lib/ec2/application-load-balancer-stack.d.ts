import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { LoadBalancerType } from "../../src/ec2/type/loadbalancer.type";
export declare class ApplicationLoadBalancerStack extends cdk.Stack {
    constructor(scope: Construct, id: string, options: LoadBalancerType, props?: cdk.StackProps);
}
