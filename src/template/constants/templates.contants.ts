export type WebThreeTier = {
  publicInstance1InstanceName: string;
  publicInstance1Uuid: string;
  publicInstance1InstanceType: string;
  publicInstance2InstanceName: string;
  publicInstance2Uuid: string;
  publicInstance2InstanceType: string;

  privateInstance1InstanceName: string;
  privateInstance1Uuid: string;
  privateInstance1InstanceType: string;
  privateInstance2InstanceName: string;
  privateInstance2Uuid: string;
  privateInstance2InstanceType: string;

  bucketName: string;
};

export const webThreeTierArchitecture = (dto: WebThreeTier) => {
  return `AWSTemplateFormatVersion: "2010-09-09"

Description: "Web Three tier Architecture"

Parameters:
  VPC:
    Type: String
    Default: "vpc-0719a1184fa5ccdcd"

  PrivateSubnet1:
    Type: String
    Default: "subnet-08ad678f10d1751f9"

  PrivateSubnet2:
    Type: String
    Default: "subnet-083b485efbc75aee3"

  PublicSubnet1:
    Type: String
    Default: "subnet-043aec505f84e38ac"

  PublicSubnet2:
    Type: String
    Default: "subnet-07c1a5153af279dab"

  PublicSecurityGroupId:
    Type: String
    Default: "sg-0b21f621ed9a2ad0a"

  PrivateSecurityGroupId:
    Type: String
    Default: "sg-047d0f165888ef03a"

Resources:
  PublicInstance1:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: "ami-0f6fdd05c7b50bbd6"
      InstanceType: ${dto.publicInstance1InstanceType}
      Monitoring: true
      NetworkInterfaces:
        - AssociatePublicIpAddress: true
          SubnetId: !Ref PublicSubnet1
          DeviceIndex: "0"
          GroupSet:
            - !Ref PublicSecurityGroupId
      Tags:
        - Key: "Name"
          Value: ${dto.publicInstance1InstanceName}

  PublicInstance2:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: "ami-0f6fdd05c7b50bbd6"
      InstanceType: ${dto.publicInstance2InstanceType}
      Monitoring: true
      NetworkInterfaces:
        - AssociatePublicIpAddress: true
          SubnetId: !Ref PublicSubnet2
          DeviceIndex: "0"
          GroupSet:
            - !Ref PublicSecurityGroupId
      Tags:
        - Key: "Name"
          Value: ${dto.publicInstance2InstanceName}

  PrivateInstance1:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: "ami-0f6fdd05c7b50bbd6"
      InstanceType: ${dto.privateInstance1InstanceType}
      Monitoring: true
      SecurityGroupIds:
        - !Ref PrivateSecurityGroupId
      SubnetId: !Ref PrivateSubnet1
      Tags:
        - Key: "Name"
          Value: ${dto.privateInstance1InstanceName}

  PrivateInstance2:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: "ami-0f6fdd05c7b50bbd6"
      InstanceType: ${dto.privateInstance2InstanceType}
      Monitoring: true
      SecurityGroupIds:
        - !Ref PrivateSecurityGroupId
      SubnetId: !Ref PrivateSubnet2
      Tags:
        - Key: "Name"
          Value: ${dto.privateInstance2InstanceName}

  # ===============================================================================
  # ===============================================================================
  # ===============================================================================
  # ================================== S3 =========================================
  # ===============================================================================
  # ===============================================================================
  # ===============================================================================

  Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: ${dto.bucketName}
      PublicAccessBlockConfiguration:
        BlockPublicAcls: false
        BlockPublicPolicy: false
        IgnorePublicAcls: false
        RestrictPublicBuckets: false

  BucketPolicy:
    Type: AWS::S3::BucketPolicy
    Properties:
      Bucket: !Ref Bucket
      PolicyDocument:
        Version: 2012-10-17
        Statement:
          - Action:
              - 's3:GetObject'
            Effect: Allow
            Resource: !Join
              - ''
              - - 'arn:aws:s3:::'
                - !Ref Bucket
                - /*
            Principal: '*'


  # ===============================================================================
  # ===============================================================================
  # ===============================================================================
  # ================================== RDS ========================================
  # ===============================================================================
  # ===============================================================================
  # ===============================================================================
#  RDS:
#    Type: AWS::RDS::DBInstance
#    Properties:
#      AllocatedStorage: 5
#      Engine: Mysql
#      DBName: kumofactory
#      DBInstanceClass: db.t3.micro
#      MultiAZ: false
#      MasterUsername: root
#      MasterUserPassword: qwer1234


# ===============================================================================
# ===============================================================================
# ===============================================================================
# ================================== Output =====================================
# ===============================================================================
# ===============================================================================
# ===============================================================================
Outputs:
  PublicInstance1Id:
    Description: The Instance ID
    Value: !Ref PublicInstance1

  PublicInstance1Uuid:
    Description: Uuid
    Value: ${dto.publicInstance1Uuid}

  PublicInstance1Name:
    Description: The Instance Name
    Value: ${dto.publicInstance1InstanceName}

  PublicInstance1PublicIP:
    Description: The Instance Name
    Value: !GetAtt PublicInstance1.PublicIp

  PublicInstance2Id:
    Description: The Instance ID
    Value: !Ref PublicInstance2

  PublicInstance2Uuid:
    Description: Uuid
    Value: ${dto.publicInstance2Uuid}

  PublicInstance2Name:
    Description: The Instance Name
    Value: ${dto.publicInstance2InstanceName}

  PublicInstance2PublicIP:
    Description: The Instance IP
    Value: !GetAtt PublicInstance2.PublicIp

  PrivateInstance1PrivateIP:
    Description: A Private IP
    Value: !GetAtt PrivateInstance1.PrivateIp

  PrivateInstance1Id:
    Description: The Instance ID
    Value: !Ref PrivateInstance1

  PrivateInstance1Uuid:
    Description: Uuid
    Value: ${dto.privateInstance1Uuid}

  PrivateInstance1Name:
    Description: The Instance Name
    Value: ${dto.privateInstance1InstanceName}

  PrivateInstance2PrivateIP:
    Description: A Private IP
    Value: !GetAtt PrivateInstance2.PrivateIp

  PrivateInstance2Id:
    Description: The Instance ID
    Value: !Ref PrivateInstance2

  PrivateInstance2Uuid:
    Description: Uuid
    Value: ${dto.privateInstance2Uuid}

  PrivateInstance2Name:
    Description: The Instance Name
    Value: ${dto.privateInstance2InstanceName}

  BucketArn:
    Description: Bucket Name
    Value: !GetAtt Bucket.Arn

  BucketDomainName:
    Description: Bucket Domain Name
    Value: !GetAtt Bucket.DomainName
`;
};
