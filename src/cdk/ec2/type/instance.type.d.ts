export interface Ec2StackOption {
    instanceType: string;
    machineImage: string;
    subnetType: AccessScope;
    availabilityZone: AvailabilityZone;
    instanceName: string;
    securityGroupType: AccessScope;
    id: string;
}
declare const AccessScope: {
    readonly Public: "Public";
    readonly Private: "Private";
    readonly Database: "Database";
};
export declare const AccessScopeType: {
    PUBLIC: "Public";
    PRIVATE: "Private";
    DATABASE: "Database";
};
export type AccessScope = typeof AccessScope[keyof typeof AccessScope];
declare const AvailabilityZone: {
    AP_NORTHEAST_2A: string;
    AP_NORTHEAST_2C: string;
};
export declare const AvailabilityZoneType: {
    AP_NORTHEAST_2A: string;
    AP_NORTHEAST_2C: string;
};
export type AvailabilityZone = typeof AvailabilityZone[keyof typeof AvailabilityZone];
export {};
