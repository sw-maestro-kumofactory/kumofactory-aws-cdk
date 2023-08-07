import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { getSecurityGroup } from '../../src/cdk/ec2/security-group';
import { getVpc } from '../../src/cdk/ec2/vpc';
import { getSubnet } from '../../src/cdk/ec2/subnet';
import { Ec2StackOption } from '../../src/cdk/ec2/type/instance.type';
import { createNewInstance } from '../../src/cdk/ec2/instance';

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

  public getInstance(): ec2.Instance {
    return this.instance;
  }

  public getInstanceId(): string {
    return this.instance.instanceId;
  }
}
