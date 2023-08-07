import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as elb from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { ApplicationProtocol } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as elbTarget from 'aws-cdk-lib/aws-elasticloadbalancingv2-targets';
import { Construct } from 'constructs';
import { getVpc } from './vpc';
import { getSubnet } from './subnet';
import {
  AccessScope,
  AccessScopeType,
  AvailabilityZone,
  AvailabilityZoneType,
} from './type/instance.type';
import { getSecurityGroup } from './security-group';
import { LoadBalancerType } from './type/loadbalancer.type';

declare const vpc: ec2.Vpc;

export const createApplicationLoadBalancer = (
  scope: Construct,
  props: LoadBalancerType,
) => {
  console.log('IDS : ', props.instancesIds);
  const lb = new elb.ApplicationLoadBalancer(scope, props.id, {
    vpc: getVpc(scope),
    internetFacing: true,
    loadBalancerName: props.name,
    vpcSubnets: {
      subnets: [
        getSubnet(
          scope,
          AccessScopeType.PUBLIC,
          AvailabilityZoneType.AP_NORTHEAST_2A,
        ),
        getSubnet(
          scope,
          AccessScopeType.PUBLIC,
          AvailabilityZoneType.AP_NORTHEAST_2C,
        ),
      ],
    },
    securityGroup: getSecurityGroup(scope, AccessScopeType.PUBLIC),
  });

  const listener = lb.addListener('testListener', {
    port: props.port,
    open: true,
  });

  const targetGroup = listener.addTargets(props.listenerId, {
    port: props.targetGroupPort,
    protocol: ApplicationProtocol.HTTP,
    targetGroupName: props.targetGroupName,
    healthCheck: {
      path: `${props.healthCheckPath}`, // The endpoint path for health checks
      interval: cdk.Duration.seconds(30), // Health check interval
      timeout: cdk.Duration.seconds(5), // Health check timeout
    },
  });

  props.instancesIds.map((targetGroupKey) => {
    const instanceIdTarget = new elbTarget.InstanceIdTarget(
      targetGroupKey,
      props.targetGroupPort,
    );
    instanceIdTarget.attachToApplicationTargetGroup(targetGroup);
    targetGroup.addTarget(instanceIdTarget);
  });

  return;
};
