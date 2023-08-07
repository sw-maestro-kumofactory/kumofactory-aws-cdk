"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplicationLoadBalancer = void 0;
const cdk = require("aws-cdk-lib");
const elb = require("aws-cdk-lib/aws-elasticloadbalancingv2");
const aws_elasticloadbalancingv2_1 = require("aws-cdk-lib/aws-elasticloadbalancingv2");
const elbTarget = require("aws-cdk-lib/aws-elasticloadbalancingv2-targets");
const vpc_1 = require("./vpc");
const subnet_1 = require("./subnet");
const instance_type_1 = require("./type/instance.type");
const security_group_1 = require("./security-group");
const createApplicationLoadBalancer = (scope, props) => {
    console.log("IDS : ", props.instancesIds);
    const lb = new elb.ApplicationLoadBalancer(scope, props.id, {
        vpc: (0, vpc_1.getVpc)(scope),
        internetFacing: true,
        loadBalancerName: props.name,
        vpcSubnets: {
            subnets: [
                (0, subnet_1.getSubnet)(scope, instance_type_1.AccessScopeType.PUBLIC, instance_type_1.AvailabilityZoneType.AP_NORTHEAST_2A),
                (0, subnet_1.getSubnet)(scope, instance_type_1.AccessScopeType.PUBLIC, instance_type_1.AvailabilityZoneType.AP_NORTHEAST_2C)
            ]
        },
        securityGroup: (0, security_group_1.getSecurityGroup)(scope, instance_type_1.AccessScopeType.PUBLIC)
    });
    const listener = lb.addListener("testListener", {
        port: props.port,
        open: true
    });
    const targetGroup = listener.addTargets(props.listenerId, {
        port: props.targetGroupPort,
        protocol: aws_elasticloadbalancingv2_1.ApplicationProtocol.HTTP,
        targetGroupName: props.targetGroupName,
        healthCheck: {
            path: `${props.healthCheckPath}`,
            interval: cdk.Duration.seconds(30),
            timeout: cdk.Duration.seconds(5), // Health check timeout
        }
    });
    props.instancesIds.map((targetGroupKey) => {
        const instanceIdTarget = new elbTarget.InstanceIdTarget(targetGroupKey, props.targetGroupPort);
        instanceIdTarget.attachToApplicationTargetGroup(targetGroup);
        targetGroup.addTarget(instanceIdTarget);
    });
    return;
};
exports.createApplicationLoadBalancer = createApplicationLoadBalancer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGJhbGFuY2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9hZGJhbGFuY2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUVuQyw4REFBOEQ7QUFDOUQsdUZBQTJFO0FBQzNFLDRFQUE0RTtBQUU1RSwrQkFBNkI7QUFDN0IscUNBQW1DO0FBQ25DLHdEQUEwRztBQUMxRyxxREFBa0Q7QUFLM0MsTUFBTSw2QkFBNkIsR0FBRyxDQUFDLEtBQWdCLEVBQUUsS0FBdUIsRUFBRSxFQUFFO0lBQ3ZGLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMxQyxNQUFNLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTtRQUN4RCxHQUFHLEVBQUUsSUFBQSxZQUFNLEVBQUMsS0FBSyxDQUFDO1FBQ2xCLGNBQWMsRUFBRSxJQUFJO1FBQ3BCLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxJQUFJO1FBQzVCLFVBQVUsRUFBRTtZQUNSLE9BQU8sRUFBRTtnQkFDTCxJQUFBLGtCQUFTLEVBQUMsS0FBSyxFQUFFLCtCQUFlLENBQUMsTUFBTSxFQUFFLG9DQUFvQixDQUFDLGVBQWUsQ0FBQztnQkFDOUUsSUFBQSxrQkFBUyxFQUFDLEtBQUssRUFBRSwrQkFBZSxDQUFDLE1BQU0sRUFBRSxvQ0FBb0IsQ0FBQyxlQUFlLENBQUM7YUFDakY7U0FDSjtRQUNELGFBQWEsRUFBRSxJQUFBLGlDQUFnQixFQUFDLEtBQUssRUFBRSwrQkFBZSxDQUFDLE1BQU0sQ0FBQztLQUNqRSxDQUFDLENBQUM7SUFFSCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRTtRQUM1QyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7UUFDaEIsSUFBSSxFQUFFLElBQUk7S0FDYixDQUFDLENBQUM7SUFFSCxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7UUFDdEQsSUFBSSxFQUFFLEtBQUssQ0FBQyxlQUFlO1FBQzNCLFFBQVEsRUFBRSxnREFBbUIsQ0FBQyxJQUFJO1FBQ2xDLGVBQWUsRUFBRSxLQUFLLENBQUMsZUFBZTtRQUN0QyxXQUFXLEVBQUU7WUFDVCxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ2hDLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDbEMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLHVCQUF1QjtTQUM1RDtLQUNKLENBQUMsQ0FBQztJQUVILEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7UUFDdEMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQy9GLGdCQUFnQixDQUFDLDhCQUE4QixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdELFdBQVcsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUMzQyxDQUFDLENBQUMsQ0FBQTtJQUVGLE9BQU87QUFDWCxDQUFDLENBQUE7QUF0Q1ksUUFBQSw2QkFBNkIsaUNBc0N6QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBlYzIgZnJvbSBcImF3cy1jZGstbGliL2F3cy1lYzJcIjtcbmltcG9ydCAqIGFzIGVsYiBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWVsYXN0aWNsb2FkYmFsYW5jaW5ndjJcIjtcbmltcG9ydCB7QXBwbGljYXRpb25Qcm90b2NvbH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1lbGFzdGljbG9hZGJhbGFuY2luZ3YyXCI7XG5pbXBvcnQgKiBhcyBlbGJUYXJnZXQgZnJvbSBcImF3cy1jZGstbGliL2F3cy1lbGFzdGljbG9hZGJhbGFuY2luZ3YyLXRhcmdldHNcIjtcbmltcG9ydCB7Q29uc3RydWN0fSBmcm9tIFwiY29uc3RydWN0c1wiO1xuaW1wb3J0IHtnZXRWcGN9IGZyb20gXCIuL3ZwY1wiO1xuaW1wb3J0IHtnZXRTdWJuZXR9IGZyb20gXCIuL3N1Ym5ldFwiO1xuaW1wb3J0IHtBY2Nlc3NTY29wZSwgQWNjZXNzU2NvcGVUeXBlLCBBdmFpbGFiaWxpdHlab25lLCBBdmFpbGFiaWxpdHlab25lVHlwZX0gZnJvbSBcIi4vdHlwZS9pbnN0YW5jZS50eXBlXCI7XG5pbXBvcnQge2dldFNlY3VyaXR5R3JvdXB9IGZyb20gXCIuL3NlY3VyaXR5LWdyb3VwXCI7XG5pbXBvcnQge0xvYWRCYWxhbmNlclR5cGV9IGZyb20gXCIuL3R5cGUvbG9hZGJhbGFuY2VyLnR5cGVcIjtcblxuZGVjbGFyZSBjb25zdCB2cGM6IGVjMi5WcGNcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUFwcGxpY2F0aW9uTG9hZEJhbGFuY2VyID0gKHNjb3BlOiBDb25zdHJ1Y3QsIHByb3BzOiBMb2FkQmFsYW5jZXJUeXBlKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJJRFMgOiBcIiwgcHJvcHMuaW5zdGFuY2VzSWRzKTtcbiAgICBjb25zdCBsYiA9IG5ldyBlbGIuQXBwbGljYXRpb25Mb2FkQmFsYW5jZXIoc2NvcGUsIHByb3BzLmlkLCB7XG4gICAgICAgIHZwYzogZ2V0VnBjKHNjb3BlKSxcbiAgICAgICAgaW50ZXJuZXRGYWNpbmc6IHRydWUsXG4gICAgICAgIGxvYWRCYWxhbmNlck5hbWU6IHByb3BzLm5hbWUsXG4gICAgICAgIHZwY1N1Ym5ldHM6IHtcbiAgICAgICAgICAgIHN1Ym5ldHM6IFtcbiAgICAgICAgICAgICAgICBnZXRTdWJuZXQoc2NvcGUsIEFjY2Vzc1Njb3BlVHlwZS5QVUJMSUMsIEF2YWlsYWJpbGl0eVpvbmVUeXBlLkFQX05PUlRIRUFTVF8yQSksXG4gICAgICAgICAgICAgICAgZ2V0U3VibmV0KHNjb3BlLCBBY2Nlc3NTY29wZVR5cGUuUFVCTElDLCBBdmFpbGFiaWxpdHlab25lVHlwZS5BUF9OT1JUSEVBU1RfMkMpXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHNlY3VyaXR5R3JvdXA6IGdldFNlY3VyaXR5R3JvdXAoc2NvcGUsIEFjY2Vzc1Njb3BlVHlwZS5QVUJMSUMpXG4gICAgfSk7XG5cbiAgICBjb25zdCBsaXN0ZW5lciA9IGxiLmFkZExpc3RlbmVyKFwidGVzdExpc3RlbmVyXCIsIHtcbiAgICAgICAgcG9ydDogcHJvcHMucG9ydCxcbiAgICAgICAgb3BlbjogdHJ1ZVxuICAgIH0pO1xuXG4gICAgY29uc3QgdGFyZ2V0R3JvdXAgPSBsaXN0ZW5lci5hZGRUYXJnZXRzKHByb3BzLmxpc3RlbmVySWQsIHtcbiAgICAgICAgcG9ydDogcHJvcHMudGFyZ2V0R3JvdXBQb3J0LFxuICAgICAgICBwcm90b2NvbDogQXBwbGljYXRpb25Qcm90b2NvbC5IVFRQLFxuICAgICAgICB0YXJnZXRHcm91cE5hbWU6IHByb3BzLnRhcmdldEdyb3VwTmFtZSxcbiAgICAgICAgaGVhbHRoQ2hlY2s6IHtcbiAgICAgICAgICAgIHBhdGg6IGAke3Byb3BzLmhlYWx0aENoZWNrUGF0aH1gLCAvLyBUaGUgZW5kcG9pbnQgcGF0aCBmb3IgaGVhbHRoIGNoZWNrc1xuICAgICAgICAgICAgaW50ZXJ2YWw6IGNkay5EdXJhdGlvbi5zZWNvbmRzKDMwKSwgLy8gSGVhbHRoIGNoZWNrIGludGVydmFsXG4gICAgICAgICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcyg1KSwgLy8gSGVhbHRoIGNoZWNrIHRpbWVvdXRcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcHJvcHMuaW5zdGFuY2VzSWRzLm1hcCgodGFyZ2V0R3JvdXBLZXkpID0+IHtcbiAgICAgICAgY29uc3QgaW5zdGFuY2VJZFRhcmdldCA9IG5ldyBlbGJUYXJnZXQuSW5zdGFuY2VJZFRhcmdldCh0YXJnZXRHcm91cEtleSwgcHJvcHMudGFyZ2V0R3JvdXBQb3J0KTtcbiAgICAgICAgaW5zdGFuY2VJZFRhcmdldC5hdHRhY2hUb0FwcGxpY2F0aW9uVGFyZ2V0R3JvdXAodGFyZ2V0R3JvdXApO1xuICAgICAgICB0YXJnZXRHcm91cC5hZGRUYXJnZXQoaW5zdGFuY2VJZFRhcmdldClcbiAgICB9KVxuXG4gICAgcmV0dXJuO1xufVxuIl19