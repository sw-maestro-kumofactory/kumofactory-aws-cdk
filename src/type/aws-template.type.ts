export const AwsTemplateType = {
  PRIVATE_INSTANCE1: 'PRIVATE_INSTANCE1',
  PRIVATE_INSTANCE2: 'PRIVATE_INSTANCE2',
  PUBLIC_INSTANCE1: 'PUBLIC_INSTANCE1',
  PUBLIC_INSTANCE2: 'PUBLIC_INSTANCE2',
  S3: 'S3',
};

export type AwsTemplateType =
  (typeof AwsTemplateType)[keyof typeof AwsTemplateType];
