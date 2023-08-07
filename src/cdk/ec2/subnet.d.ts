import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from "constructs";
import { AccessScope, AvailabilityZone } from "./type/instance.type";
export declare const getSubnet: (scope: Construct, type: AccessScope, availabilityZone: AvailabilityZone) => ec2.ISubnet;
