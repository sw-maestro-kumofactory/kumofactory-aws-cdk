import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LoadBalancerType } from '../../cdk/ec2/type/loadbalancer.type';
import { createApplicationLoadBalancer } from '../../cdk/ec2/loadbalancer';

export class ApplicationLoadBalancerStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    options: LoadBalancerType,
    props?: cdk.StackProps,
  ) {
    super(scope, id, props);
    createApplicationLoadBalancer(this, options);
  }
}
