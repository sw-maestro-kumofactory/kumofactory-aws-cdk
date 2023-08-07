import * as ec2 from "aws-cdk-lib/aws-ec2";
/**
 * 로드 밸런서 이름
 * internet-facing (true)
 * vpc(vpc id : vpc-0719a1184fa5ccdcd)
 * azs (ap-northeast-2a, 2c)
 * security group ( Public: sg-0b21f621ed9a2ad0a, Private: 	sg-047d0f165888ef03a )
 * listener (port, target group)
 * tags (optional)
 */
export interface LoadBalancerType {
    id: string; // load balancer id
    port: number; // for listener
    targetGroupPort: number; // for target group
    targetGroupId: string;
    targetGroupName: string;
    healthCheckPath: string // url for health check ex) "/"
    name: string; // loadBalancerName
    listenerId: string; // listener id
    instancesIds: string[];
}
