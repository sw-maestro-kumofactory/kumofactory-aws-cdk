import { Injectable } from '@nestjs/common';
import * as cdk from 'aws-cdk-lib';
import { MessageDto } from '../dto /message.dto';
import { AwsComponentType } from '../type/aws-component.type';
import { Construct } from 'constructs';
import { Ec2InstanceStack } from '../../lib/ec2/Ec2InstanceStack';
import { ApplicationLoadBalancerStack } from '../../lib/ec2/application-load-balancer-stack';
import { RdsInstanceStack } from '../../lib/rds/rds-instance-stack';
import { exec } from 'aws-cdk/lib';
import * as fs from 'fs';

@Injectable()
export class AwsConfigureService {
  public static data: MessageDto[] = [];
  public static isRun = false;
}
