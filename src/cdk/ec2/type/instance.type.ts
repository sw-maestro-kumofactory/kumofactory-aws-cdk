export interface Ec2StackOption {
  instanceType: string; // ex) t2.micro
  machineImage: string; // amazon linux 2023
  subnetType: AccessScope;
  availabilityZone: AvailabilityZone;
  instanceName: string;
  securityGroupType: AccessScope;
  id: string;
}

const AccessScope = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
  DATABASE: 'DATABASE',
} as const;
export const AccessScopeType = {
  PUBLIC: AccessScope.PUBLIC,
  PRIVATE: AccessScope.PRIVATE,
  DATABASE: AccessScope.DATABASE,
};
export type AccessScope = (typeof AccessScope)[keyof typeof AccessScope];

const AvailabilityZone = {
  AP_NORTHEAST_2A: 'AP_NORTHEAST_2A',
  AP_NORTHEAST_2C: 'AP_NORTHEAST_2C',
};

export const AvailabilityZoneType = {
  AP_NORTHEAST_2A: AvailabilityZone.AP_NORTHEAST_2A,
  AP_NORTHEAST_2C: AvailabilityZone.AP_NORTHEAST_2C,
};
export type AvailabilityZone =
  (typeof AvailabilityZone)[keyof typeof AvailabilityZone];
