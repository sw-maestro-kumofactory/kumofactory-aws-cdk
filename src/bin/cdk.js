#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("aws-cdk-lib");
const Ec2InstanceStack_1 = require("../lib/ec2/Ec2InstanceStack");
const instance_type_1 = require("../src/ec2/type/instance.type");
const uuid_1 = require("uuid");
const app = new cdk.App();
const env = {
    account: "434126037102",
    region: "ap-northeast-2"
};
// new RdsInstanceStack(app, "newInstance3", {env});
const ec2InstanceStack1 = new Ec2InstanceStack_1.Ec2InstanceStack(app, "a" + (0, uuid_1.v4)().toString(), { env }, {
    instanceType: "t3.micro",
    machineImage: "linux",
    subnetType: instance_type_1.AccessScopeType.PUBLIC,
    availabilityZone: instance_type_1.AvailabilityZoneType.AP_NORTHEAST_2A,
    instanceName: "instance1",
    securityGroupType: instance_type_1.AccessScopeType.PUBLIC,
    id: "a" + (0, uuid_1.v4)().toString()
});
//
// const ec2InstanceStack2 = new Ec2InstanceStack(app, "a" +uuidV4().toString(), {env}, {
//     instanceType: "t3.micro", // ex) t2.micro
//     machineImage: "linux", // amazon linux 2023
//     subnetType: AccessScopeType.PUBLIC,
//     availabilityZone: AvailabilityZoneType.AP_NORTHEAST_2C,
//     instanceName: "instance2",
//     securityGroupType: AccessScopeType.PUBLIC,
//     id: "a" +uuidV4().toString()
// });
//
// const albOptions: LoadBalancerType = {
//     healthCheckPath: "/",
//     id: "a" +uuidV4().toString(),
//     instancesIds: [ec2InstanceStack1.getInstanceId(), ec2InstanceStack2.getInstanceId()],
//     listenerId: uuidV4().toString(),
//     name: "qwiorjio32",
//     port: 80,
//     targetGroupId: "a" +uuidV4().toString(),
//     targetGroupName: "hellogroup2",
//     targetGroupPort: 8080,
// }
// new ApplicationLoadBalancerStack(app, "a" +uuidV4().toString(), albOptions, {env});
// new Ec2InstanceStack(app, "TestInstance3", {env}, {
//     instanceType: "t3.micro", // ex) t2.micro
//     machineImage: "linux", // amazon linux 2023
//     subnetType: AccessScope.Private,
//     availabilityZone: AvailabilityZone.AP_NORTHEAST_2A,
//     instanceName: "hello new instance",
//     securityGroupType: AccessScope.Private,
//     id: "Private Instance1"
// });
//
// new Ec2InstanceStack(app, "TestInstance4", {env}, {
//     instanceType: "t3.micro", // ex) t2.micro
//     machineImage: "linux", // amazon linux 2023
//     subnetType: AccessScope.Private,
//     availabilityZone: AvailabilityZone.AP_NORTHEAST_2C,
//     instanceName: "hello new instance",
//     securityGroupType: AccessScope.Private,
//     id: "Private Instance2"
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUFxQztBQUNyQyxtQ0FBbUM7QUFHbkMsa0VBQTZEO0FBQzdELGlFQUFtSDtBQUduSCwrQkFBb0M7QUFHcEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsTUFBTSxHQUFHLEdBQUc7SUFDUixPQUFPLEVBQUUsY0FBYztJQUN2QixNQUFNLEVBQUUsZ0JBQWdCO0NBQzNCLENBQUE7QUFFRCxvREFBb0Q7QUFFcEQsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLG1DQUFnQixDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsSUFBQSxTQUFNLEdBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFDLEdBQUcsRUFBQyxFQUFFO0lBQ2xGLFlBQVksRUFBRSxVQUFVO0lBQ3hCLFlBQVksRUFBRSxPQUFPO0lBQ3JCLFVBQVUsRUFBRSwrQkFBZSxDQUFDLE1BQU07SUFDbEMsZ0JBQWdCLEVBQUUsb0NBQW9CLENBQUMsZUFBZTtJQUN0RCxZQUFZLEVBQUUsV0FBVztJQUN6QixpQkFBaUIsRUFBRSwrQkFBZSxDQUFDLE1BQU07SUFDekMsRUFBRSxFQUFFLEdBQUcsR0FBRyxJQUFBLFNBQU0sR0FBRSxDQUFDLFFBQVEsRUFBRTtDQUNoQyxDQUFDLENBQUM7QUFDSCxFQUFFO0FBQ0YseUZBQXlGO0FBQ3pGLGdEQUFnRDtBQUNoRCxrREFBa0Q7QUFDbEQsMENBQTBDO0FBQzFDLDhEQUE4RDtBQUM5RCxpQ0FBaUM7QUFDakMsaURBQWlEO0FBQ2pELG1DQUFtQztBQUNuQyxNQUFNO0FBQ04sRUFBRTtBQUNGLHlDQUF5QztBQUN6Qyw0QkFBNEI7QUFDNUIsb0NBQW9DO0FBQ3BDLDRGQUE0RjtBQUM1Rix1Q0FBdUM7QUFDdkMsMEJBQTBCO0FBQzFCLGdCQUFnQjtBQUNoQiwrQ0FBK0M7QUFDL0Msc0NBQXNDO0FBQ3RDLDZCQUE2QjtBQUM3QixJQUFJO0FBRUosc0ZBQXNGO0FBRXRGLHNEQUFzRDtBQUN0RCxnREFBZ0Q7QUFDaEQsa0RBQWtEO0FBQ2xELHVDQUF1QztBQUN2QywwREFBMEQ7QUFDMUQsMENBQTBDO0FBQzFDLDhDQUE4QztBQUM5Qyw4QkFBOEI7QUFDOUIsTUFBTTtBQUNOLEVBQUU7QUFDRixzREFBc0Q7QUFDdEQsZ0RBQWdEO0FBQ2hELGtEQUFrRDtBQUNsRCx1Q0FBdUM7QUFDdkMsMERBQTBEO0FBQzFELDBDQUEwQztBQUMxQyw4Q0FBOEM7QUFDOUMsOEJBQThCO0FBQzlCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ2RrU3RhY2sgfSBmcm9tICcuLi9saWIvY2RrLXN0YWNrJztcbmltcG9ydCB7SGVsbG9DZGtTdGFja30gZnJvbSBcIi4uL2xpYi9TM1N0YWNrXCI7XG5pbXBvcnQge0VjMkluc3RhbmNlU3RhY2t9IGZyb20gXCIuLi9saWIvZWMyL0VjMkluc3RhbmNlU3RhY2tcIjtcbmltcG9ydCB7QWNjZXNzU2NvcGUsIEFjY2Vzc1Njb3BlVHlwZSwgQXZhaWxhYmlsaXR5Wm9uZSwgQXZhaWxhYmlsaXR5Wm9uZVR5cGV9IGZyb20gXCIuLi9zcmMvZWMyL3R5cGUvaW5zdGFuY2UudHlwZVwiO1xuaW1wb3J0IHtMb2FkQmFsYW5jZXJUeXBlfSBmcm9tICcuLi9zcmMvZWMyL3R5cGUvbG9hZGJhbGFuY2VyLnR5cGUnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbkxvYWRCYWxhbmNlclN0YWNrfSBmcm9tIFwiLi4vbGliL2VjMi9hcHBsaWNhdGlvbi1sb2FkLWJhbGFuY2VyLXN0YWNrXCI7XG5pbXBvcnQgeyB2NCBhcyB1dWlkVjQgfSBmcm9tIFwidXVpZFwiO1xuaW1wb3J0IHtSZHNJbnN0YW5jZVN0YWNrfSBmcm9tIFwiLi4vbGliL3Jkcy9yZHMtaW5zdGFuY2Utc3RhY2tcIjtcblxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbmNvbnN0IGVudiA9IHtcbiAgICBhY2NvdW50OiBcIjQzNDEyNjAzNzEwMlwiLFxuICAgIHJlZ2lvbjogXCJhcC1ub3J0aGVhc3QtMlwiXG59XG5cbi8vIG5ldyBSZHNJbnN0YW5jZVN0YWNrKGFwcCwgXCJuZXdJbnN0YW5jZTNcIiwge2Vudn0pO1xuXG5jb25zdCBlYzJJbnN0YW5jZVN0YWNrMSA9IG5ldyBFYzJJbnN0YW5jZVN0YWNrKGFwcCwgXCJhXCIgKyB1dWlkVjQoKS50b1N0cmluZygpLCB7ZW52fSwge1xuICAgIGluc3RhbmNlVHlwZTogXCJ0My5taWNyb1wiLCAvLyBleCkgdDIubWljcm9cbiAgICBtYWNoaW5lSW1hZ2U6IFwibGludXhcIiwgLy8gYW1hem9uIGxpbnV4IDIwMjNcbiAgICBzdWJuZXRUeXBlOiBBY2Nlc3NTY29wZVR5cGUuUFVCTElDLFxuICAgIGF2YWlsYWJpbGl0eVpvbmU6IEF2YWlsYWJpbGl0eVpvbmVUeXBlLkFQX05PUlRIRUFTVF8yQSxcbiAgICBpbnN0YW5jZU5hbWU6IFwiaW5zdGFuY2UxXCIsXG4gICAgc2VjdXJpdHlHcm91cFR5cGU6IEFjY2Vzc1Njb3BlVHlwZS5QVUJMSUMsXG4gICAgaWQ6IFwiYVwiICsgdXVpZFY0KCkudG9TdHJpbmcoKVxufSk7XG4vL1xuLy8gY29uc3QgZWMySW5zdGFuY2VTdGFjazIgPSBuZXcgRWMySW5zdGFuY2VTdGFjayhhcHAsIFwiYVwiICt1dWlkVjQoKS50b1N0cmluZygpLCB7ZW52fSwge1xuLy8gICAgIGluc3RhbmNlVHlwZTogXCJ0My5taWNyb1wiLCAvLyBleCkgdDIubWljcm9cbi8vICAgICBtYWNoaW5lSW1hZ2U6IFwibGludXhcIiwgLy8gYW1hem9uIGxpbnV4IDIwMjNcbi8vICAgICBzdWJuZXRUeXBlOiBBY2Nlc3NTY29wZVR5cGUuUFVCTElDLFxuLy8gICAgIGF2YWlsYWJpbGl0eVpvbmU6IEF2YWlsYWJpbGl0eVpvbmVUeXBlLkFQX05PUlRIRUFTVF8yQyxcbi8vICAgICBpbnN0YW5jZU5hbWU6IFwiaW5zdGFuY2UyXCIsXG4vLyAgICAgc2VjdXJpdHlHcm91cFR5cGU6IEFjY2Vzc1Njb3BlVHlwZS5QVUJMSUMsXG4vLyAgICAgaWQ6IFwiYVwiICt1dWlkVjQoKS50b1N0cmluZygpXG4vLyB9KTtcbi8vXG4vLyBjb25zdCBhbGJPcHRpb25zOiBMb2FkQmFsYW5jZXJUeXBlID0ge1xuLy8gICAgIGhlYWx0aENoZWNrUGF0aDogXCIvXCIsXG4vLyAgICAgaWQ6IFwiYVwiICt1dWlkVjQoKS50b1N0cmluZygpLFxuLy8gICAgIGluc3RhbmNlc0lkczogW2VjMkluc3RhbmNlU3RhY2sxLmdldEluc3RhbmNlSWQoKSwgZWMySW5zdGFuY2VTdGFjazIuZ2V0SW5zdGFuY2VJZCgpXSxcbi8vICAgICBsaXN0ZW5lcklkOiB1dWlkVjQoKS50b1N0cmluZygpLFxuLy8gICAgIG5hbWU6IFwicXdpb3JqaW8zMlwiLFxuLy8gICAgIHBvcnQ6IDgwLFxuLy8gICAgIHRhcmdldEdyb3VwSWQ6IFwiYVwiICt1dWlkVjQoKS50b1N0cmluZygpLFxuLy8gICAgIHRhcmdldEdyb3VwTmFtZTogXCJoZWxsb2dyb3VwMlwiLFxuLy8gICAgIHRhcmdldEdyb3VwUG9ydDogODA4MCxcbi8vIH1cblxuLy8gbmV3IEFwcGxpY2F0aW9uTG9hZEJhbGFuY2VyU3RhY2soYXBwLCBcImFcIiArdXVpZFY0KCkudG9TdHJpbmcoKSwgYWxiT3B0aW9ucywge2Vudn0pO1xuXG4vLyBuZXcgRWMySW5zdGFuY2VTdGFjayhhcHAsIFwiVGVzdEluc3RhbmNlM1wiLCB7ZW52fSwge1xuLy8gICAgIGluc3RhbmNlVHlwZTogXCJ0My5taWNyb1wiLCAvLyBleCkgdDIubWljcm9cbi8vICAgICBtYWNoaW5lSW1hZ2U6IFwibGludXhcIiwgLy8gYW1hem9uIGxpbnV4IDIwMjNcbi8vICAgICBzdWJuZXRUeXBlOiBBY2Nlc3NTY29wZS5Qcml2YXRlLFxuLy8gICAgIGF2YWlsYWJpbGl0eVpvbmU6IEF2YWlsYWJpbGl0eVpvbmUuQVBfTk9SVEhFQVNUXzJBLFxuLy8gICAgIGluc3RhbmNlTmFtZTogXCJoZWxsbyBuZXcgaW5zdGFuY2VcIixcbi8vICAgICBzZWN1cml0eUdyb3VwVHlwZTogQWNjZXNzU2NvcGUuUHJpdmF0ZSxcbi8vICAgICBpZDogXCJQcml2YXRlIEluc3RhbmNlMVwiXG4vLyB9KTtcbi8vXG4vLyBuZXcgRWMySW5zdGFuY2VTdGFjayhhcHAsIFwiVGVzdEluc3RhbmNlNFwiLCB7ZW52fSwge1xuLy8gICAgIGluc3RhbmNlVHlwZTogXCJ0My5taWNyb1wiLCAvLyBleCkgdDIubWljcm9cbi8vICAgICBtYWNoaW5lSW1hZ2U6IFwibGludXhcIiwgLy8gYW1hem9uIGxpbnV4IDIwMjNcbi8vICAgICBzdWJuZXRUeXBlOiBBY2Nlc3NTY29wZS5Qcml2YXRlLFxuLy8gICAgIGF2YWlsYWJpbGl0eVpvbmU6IEF2YWlsYWJpbGl0eVpvbmUuQVBfTk9SVEhFQVNUXzJDLFxuLy8gICAgIGluc3RhbmNlTmFtZTogXCJoZWxsbyBuZXcgaW5zdGFuY2VcIixcbi8vICAgICBzZWN1cml0eUdyb3VwVHlwZTogQWNjZXNzU2NvcGUuUHJpdmF0ZSxcbi8vICAgICBpZDogXCJQcml2YXRlIEluc3RhbmNlMlwiXG4vLyB9KTtcblxuXG4iXX0=