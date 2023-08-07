"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVpc = void 0;
const ec2 = require("aws-cdk-lib/aws-ec2");
const getVpc = (scope) => {
    return ec2.Vpc.fromLookup(scope, "Vpc", {
        vpcId: "vpc-0719a1184fa5ccdcd"
    });
};
exports.getVpc = getVpc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnBjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidnBjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUEyQztBQUdwQyxNQUFNLE1BQU0sR0FBRyxDQUFDLEtBQWdCLEVBQUUsRUFBRTtJQUN2QyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUU7UUFDcEMsS0FBSyxFQUFFLHVCQUF1QjtLQUNqQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUE7QUFKWSxRQUFBLE1BQU0sVUFJbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBlYzIgZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjMic7XG5pbXBvcnQge0NvbnN0cnVjdH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcblxuZXhwb3J0IGNvbnN0IGdldFZwYyA9IChzY29wZTogQ29uc3RydWN0KSA9PiB7XG4gICAgcmV0dXJuIGVjMi5WcGMuZnJvbUxvb2t1cChzY29wZSwgXCJWcGNcIiwge1xuICAgICAgICB2cGNJZDogXCJ2cGMtMDcxOWExMTg0ZmE1Y2NkY2RcIlxuICAgIH0pO1xufVxuIl19