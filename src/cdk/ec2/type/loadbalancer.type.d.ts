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
    id: string;
    port: number;
    targetGroupPort: number;
    targetGroupId: string;
    targetGroupName: string;
    healthCheckPath: string;
    name: string;
    listenerId: string;
    instancesIds: string[];
}
