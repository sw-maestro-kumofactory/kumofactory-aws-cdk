import * as ec2 from 'aws-cdk-lib/aws-ec2';
import {Construct} from "constructs";

export const getVpc = (scope: Construct) => {
    return ec2.Vpc.fromLookup(scope, "Vpc", {
        vpcId: "vpc-0719a1184fa5ccdcd"
    });
}
