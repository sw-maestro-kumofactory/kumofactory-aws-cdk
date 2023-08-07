export const AwsComponentType = {
  VPC: 'VPC',
  SUBNET: 'SUBNET',
  ALB: 'ALB',
  EC2: 'EC2',
  EFS: 'EFS',
  WAF: 'WAF',
  ROUTE53: 'ROUTE53',
  NAT_GATEWAY: 'NAT_GATEWAY',
  RDS: 'RDS',
  S3: 'S3',
  ELASTIC_CACHE: 'ELASTIC_CACHE',
  CLOUDFRONT: 'CLOUDFRONT',
  AUTO_SCALING: 'AUTO_SCALING',
};

export type AwsComponentType =
  (typeof AwsComponentType)[keyof typeof AwsComponentType];
