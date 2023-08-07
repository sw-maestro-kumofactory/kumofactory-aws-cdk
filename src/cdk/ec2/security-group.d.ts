import { Construct } from "constructs";
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { AccessScope } from "./type/instance.type";
export declare const getSecurityGroup: (scope: Construct, type: AccessScope) => ec2.ISecurityGroup;
