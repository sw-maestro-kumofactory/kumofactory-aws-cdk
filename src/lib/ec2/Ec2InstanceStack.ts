import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { createNewInstance } from '../../cdk/ec2/instance';
import { Ec2StackOption } from '../../cdk/ec2/type/instance.type';

export class Ec2InstanceStack extends cdk.Stack {
  private readonly instance: ec2.Instance;

  constructor(
    scope: Construct,
    id: string,
    options: Ec2StackOption,
    props: cdk.StackProps,
  ) {
    super(scope, id, props);
    this.instance = createNewInstance(this, options);
  }

  public getInstance() {
    return this.instance.instance;
  }

  public getInstanceId(): string {
    return this.instance.instanceId;
  }
}
