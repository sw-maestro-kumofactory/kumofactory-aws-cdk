export type TEMPLATE = {
  [key: string]: string;
};

export const TEMPALTES: TEMPLATE = {
  NGINX: 'AWS_EC2_NGINX_WEBSERVER',
  S3_READ_ONLY: 'AWS_S3_ReadOnly',
  FARGATE: 'FARGATE',
};

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

export const NGINX_TEMPLATE = () => {
  return (
    '{\n' +
    '  "Description": "AWS EC2 NGINX webserver",\n' +
    '  "Metadata": {\n' +
    '    "AWS::CloudFormation::Interface": {\n' +
    '      "ParameterGroups": [\n' +
    '        {\n' +
    '          "Label": {\n' +
    '            "default": "Network Configuration"\n' +
    '          },\n' +
    '          "Parameters": [\n' +
    '            "VPC",\n' +
    '            "RemoteAccessCIDR"\n' +
    '          ]\n' +
    '        },\n' +
    '        {\n' +
    '          "Label": {\n' +
    '            "default": "Linux Instance Configuration"\n' +
    '          },\n' +
    '          "Parameters": [\n' +
    '            "KeyPair",\n' +
    '            "LinuxInstanceType",\n' +
    '            "LatestAmiId"\n' +
    '          ]\n' +
    '        }\n' +
    '      ],\n' +
    '      "ParameterLabels": {\n' +
    '        "VPC": {\n' +
    '          "default": "vpc-09b0ad37d19828da9"\n' +
    '        },\n' +
    '        "KeyPair": {\n' +
    '          "default": "kumo-key"\n' +
    '        },\n' +
    '        "RemoteAccessCIDR": {\n' +
    '          "default": "Remote Access CIDR Block"\n' +
    '        },\n' +
    '        "LinuxInstanceType": {\n' +
    '          "default": "Linux Instance Type"\n' +
    '        },\n' +
    '        "LatestAmiId": {\n' +
    '          "default": "SSM key to the latest Amazon linux AMI"\n' +
    '        }\n' +
    '      }\n' +
    '    }\n' +
    '  },\n' +
    '  "Parameters": {\n' +
    '    "VPC": {\n' +
    '      "Type": "AWS::EC2::VPC::Id",\n' +
    '      "Description": "Select the VPC where the EC2 instances will be created",\n' +
    '      "ConstraintDescription": "must be an existing VPC"\n' +
    '    },\n' +
    '    "KeyPair": {\n' +
    '      "Description": "Name of existing EC2 key pair for Linux Instances",\n' +
    '      "Type": "AWS::EC2::KeyPair::KeyName"\n' +
    '    },\n' +
    '    "RemoteAccessCIDR": {\n' +
    '      "Description": "CIDR block to allow access to linux instances",\n' +
    '      "Type": "String",\n' +
    '      "AllowedPattern": "(\\\\d{1,3})\\\\.(\\\\d{1,3})\\\\.(\\\\d{1,3})\\\\.(\\\\d{1,3})/(\\\\d{1,2})",\n' +
    '      "ConstraintDescription": "must be a valid IP CIDR range of the form x.x.x.x/x."\n' +
    '    },\n' +
    '    "InstanceType": {\n' +
    '      "Type": "String",\n' +
    '      "Default": "t3.micro",\n' +
    '      "AllowedValues": [\n' +
    '        "t2.micro",\n' +
    '        "t2.medium",\n' +
    '        "t3.micro",\n' +
    '        "t3.medium",\n' +
    '        "t3.large"\n' +
    '      ]\n' +
    '    },\n' +
    '    "LatestAmiId": {\n' +
    '      "Type": "AWS::SSM::Parameter::Value<AWS::EC2::Image::Id>",\n' +
    '      "Default": "/aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2"\n' +
    '    }\n' +
    '  },\n' +
    '  "Resources": {\n' +
    '    "WebSecurityGroup": {\n' +
    '      "Type": "AWS::EC2::SecurityGroup",\n' +
    '      "Properties": {\n' +
    '        "VpcId": {\n' +
    '          "Ref": "VPC"\n' +
    '        },\n' +
    '        "GroupDescription": "Enable HTTP and HTTPS access",\n' +
    '        "SecurityGroupIngress": [\n' +
    '          {\n' +
    '            "Description": "allow incoming HTTP",\n' +
    '            "IpProtocol": "tcp",\n' +
    '            "FromPort": 80,\n' +
    '            "ToPort": 80,\n' +
    '            "CidrIp": "0.0.0.0/0"\n' +
    '          },\n' +
    '          {\n' +
    '            "Description": "allow incoming HTTPS",\n' +
    '            "IpProtocol": "tcp",\n' +
    '            "FromPort": 443,\n' +
    '            "ToPort": 443,\n' +
    '            "CidrIp": "0.0.0.0/0"\n' +
    '          },\n' +
    '          {\n' +
    '            "Description": "allow icmp",\n' +
    '            "IpProtocol": "icmp",\n' +
    '            "FromPort": "-1",\n' +
    '            "ToPort": "-1",\n' +
    '            "CidrIp": {\n' +
    '              "Ref": "RemoteAccessCIDR"\n' +
    '            }\n' +
    '          },\n' +
    '          {\n' +
    '            "Description": "allow SSH",\n' +
    '            "IpProtocol": "tcp",\n' +
    '            "FromPort": "22",\n' +
    '            "ToPort": "22",\n' +
    '            "CidrIp": {\n' +
    '              "Ref": "RemoteAccessCIDR"\n' +
    '            }\n' +
    '          }\n' +
    '        ],\n' +
    '        "SecurityGroupEgress": [\n' +
    '          {\n' +
    '            "Description": "allow outgoing HTTP",\n' +
    '            "IpProtocol": "tcp",\n' +
    '            "FromPort": 80,\n' +
    '            "ToPort": 80,\n' +
    '            "CidrIp": "0.0.0.0/0"\n' +
    '          },\n' +
    '          {\n' +
    '            "Description": "allow outgoing HTTPS",\n' +
    '            "IpProtocol": "tcp",\n' +
    '            "FromPort": 443,\n' +
    '            "ToPort": 443,\n' +
    '            "CidrIp": "0.0.0.0/0"\n' +
    '          }\n' +
    '        ]\n' +
    '      }\n' +
    '    },\n' +
    '    "WebServerInstance": {\n' +
    '      "Type": "AWS::EC2::Instance",\n' +
    '      "Metadata": {\n' +
    '        "AWS::CloudFormation::Init": {\n' +
    '          "configSets": {\n' +
    '            "All": [\n' +
    '              "extras",\n' +
    '              "confignginx"\n' +
    '            ]\n' +
    '          },\n' +
    '          "extras": {\n' +
    '            "commands": {\n' +
    '              "enable_nginx": {\n' +
    '                "command": "amazon-linux-extras enable nginx1.12"\n' +
    '              }\n' +
    '            }\n' +
    '          },\n' +
    '          "confignginx": {\n' +
    '            "packages": {\n' +
    '              "yum": {\n' +
    '                "nginx": []\n' +
    '              }\n' +
    '            },\n' +
    '            "files": {\n' +
    '              "/usr/share/nginx/html/index.html": {\n' +
    '                "content": {\n' +
    '                  "Fn::Join": [\n' +
    '                    "\\n",\n' +
    '                    [\n' +
    '                      "<h1>Welcome to your new NGINX webserver.  web files can be found in /usr/share/nginx/html </h1>"\n' +
    '                    ]\n' +
    '                  ]\n' +
    '                },\n' +
    '                "mode": "000644",\n' +
    '                "owner": "root",\n' +
    '                "group": "root"\n' +
    '              }\n' +
    '            },\n' +
    '            "services": {\n' +
    '              "sysvinit": {\n' +
    '                "nginx": {\n' +
    '                  "enabled": "true",\n' +
    '                  "ensureRunning": "true"\n' +
    '                }\n' +
    '              }\n' +
    '            }\n' +
    '          }\n' +
    '        }\n' +
    '      },\n' +
    '      "Properties": {\n' +
    '        "InstanceType": {\n' +
    '          "Ref": "InstanceType"\n' +
    '        },\n' +
    '        "ImageId": {\n' +
    '          "Ref": "LatestAmiId"\n' +
    '        },\n' +
    '        "KeyName": {\n' +
    '          "Ref": "kumo-key"\n' +
    '        },\n' +
    '        "IamInstanceProfile": {\n' +
    '          "Ref": "PatchingInstanceProfile"\n' +
    '        },\n' +
    '        "Tags": [\n' +
    '          {\n' +
    '            "Key": "Name",\n' +
    '            "Value": {\n' +
    '              "Fn::Sub": "EC2-NGINX-${AWS::StackName}"\n' +
    '            }\n' +
    '          }\n' +
    '        ],\n' +
    '        "SecurityGroupIds": [\n' +
    '          {\n' +
    '            "Fn::GetAtt": [\n' +
    '              "WebSecurityGroup",\n' +
    '              "GroupId"\n' +
    '            ]\n' +
    '          }\n' +
    '        ],\n' +
    '        "UserData": {\n' +
    '          "Fn::Base64": {\n' +
    '            "Fn::Join": [\n' +
    '              "",\n' +
    '              [\n' +
    '                "#!/bin/bash -xe\\n",\n' +
    '                "yum update -y aws-cfn-bootstrap\\n",\n' +
    '                "# Install the files and packages from the metadata\\n",\n' +
    '                "/opt/aws/bin/cfn-init -v ",\n' +
    '                "         --stack ",\n' +
    '                {\n' +
    '                  "Ref": "AWS::StackName"\n' +
    '                },\n' +
    '                "         --resource WebServerInstance ",\n' +
    '                "         --configsets All ",\n' +
    '                "         --region ",\n' +
    '                {\n' +
    '                  "Ref": "AWS::Region"\n' +
    '                },\n' +
    '                "\\n",\n' +
    '                "# Signal the status from cfn-init\\n",\n' +
    '                "/opt/aws/bin/cfn-signal -e $? ",\n' +
    '                "         --stack ",\n' +
    '                {\n' +
    '                  "Ref": "AWS::StackName"\n' +
    '                },\n' +
    '                "         --resource WebServerInstance ",\n' +
    '                "         --region ",\n' +
    '                {\n' +
    '                  "Ref": "AWS::Region"\n' +
    '                },\n' +
    '                "\\n"\n' +
    '              ]\n' +
    '            ]\n' +
    '          }\n' +
    '        }\n' +
    '      },\n' +
    '      "CreationPolicy": {\n' +
    '        "ResourceSignal": {\n' +
    '          "Timeout": "PT5M"\n' +
    '        }\n' +
    '      }\n' +
    '    },\n' +
    '    "InstancePatchingRole": {\n' +
    '      "Type": "AWS::IAM::Role",\n' +
    '      "Properties": {\n' +
    '        "Path": "/",\n' +
    '        "ManagedPolicyArns": [\n' +
    '          "arn:aws:iam::aws:policy/service-role/AmazonEC2RoleforSSM",\n' +
    '          "arn:aws:iam::aws:policy/AmazonSSMFullAccess"\n' +
    '        ],\n' +
    '        "AssumeRolePolicyDocument": {\n' +
    '          "Version": "2012-10-17",\n' +
    '          "Statement": [\n' +
    '            {\n' +
    '              "Effect": "Allow",\n' +
    '              "Principal": {\n' +
    '                "Service": [\n' +
    '                  "ec2.amazonaws.com"\n' +
    '                ]\n' +
    '              },\n' +
    '              "Action": [\n' +
    '                "sts:AssumeRole"\n' +
    '              ]\n' +
    '            }\n' +
    '          ]\n' +
    '        }\n' +
    '      }\n' +
    '    },\n' +
    '    "PatchingInstanceProfile": {\n' +
    '      "Type": "AWS::IAM::InstanceProfile",\n' +
    '      "Properties": {\n' +
    '        "Path": "/",\n' +
    '        "Roles": [\n' +
    '          {\n' +
    '            "Ref": "InstancePatchingRole"\n' +
    '          }\n' +
    '        ]\n' +
    '      }\n' +
    '    },\n' +
    '    "LinuxPatchBaseline": {\n' +
    '      "Type": "AWS::SSM::PatchBaseline",\n' +
    '      "Properties": {\n' +
    '        "OperatingSystem": "AMAZON_LINUX",\n' +
    '        "ApprovalRules": {\n' +
    '          "PatchRules": [\n' +
    '            {\n' +
    '              "ApproveAfterDays": 0,\n' +
    '              "ComplianceLevel": "CRITICAL",\n' +
    '              "EnableNonSecurity": true,\n' +
    '              "PatchFilterGroup": {\n' +
    '                "PatchFilters": [\n' +
    '                  {\n' +
    '                    "Key": "PRODUCT",\n' +
    '                    "Values": [\n' +
    '                      "*"\n' +
    '                    ]\n' +
    '                  },\n' +
    '                  {\n' +
    '                    "Key": "CLASSIFICATION",\n' +
    '                    "Values": [\n' +
    '                      "Security",\n' +
    '                      "Bugfix",\n' +
    '                      "Enhancement",\n' +
    '                      "Recommended"\n' +
    '                    ]\n' +
    '                  },\n' +
    '                  {\n' +
    '                    "Key": "SEVERITY",\n' +
    '                    "Values": [\n' +
    '                      "Critical",\n' +
    '                      "Important",\n' +
    '                      "Medium",\n' +
    '                      "Low"\n' +
    '                    ]\n' +
    '                  }\n' +
    '                ]\n' +
    '              }\n' +
    '            }\n' +
    '          ]\n' +
    '        },\n' +
    '        "Description": "Service Catalog EC2 Reference Architecture Patch Baseline for Amazon Linux instace",\n' +
    '        "Name": "sc-ec2-ra-linux-patch-baseline"\n' +
    '      }\n' +
    '    },\n' +
    '    "MaintenanceWindowRole": {\n' +
    '      "Type": "AWS::IAM::Role",\n' +
    '      "Properties": {\n' +
    '        "Path": "/",\n' +
    '        "ManagedPolicyArns": [\n' +
    '          "arn:aws:iam::aws:policy/service-role/AmazonSSMMaintenanceWindowRole"\n' +
    '        ],\n' +
    '        "AssumeRolePolicyDocument": {\n' +
    '          "Version": "2012-10-17",\n' +
    '          "Statement": [\n' +
    '            {\n' +
    '              "Effect": "Allow",\n' +
    '              "Principal": {\n' +
    '                "Service": [\n' +
    '                  "ec2.amazonaws.com",\n' +
    '                  "ssm.amazonaws.com"\n' +
    '                ]\n' +
    '              },\n' +
    '              "Action": [\n' +
    '                "sts:AssumeRole"\n' +
    '              ]\n' +
    '            }\n' +
    '          ]\n' +
    '        }\n' +
    '      }\n' +
    '    },\n' +
    '    "MaintenanceWindow": {\n' +
    '      "Type": "AWS::SSM::MaintenanceWindow",\n' +
    '      "Properties": {\n' +
    '        "Description": "Maintenance window to allow for patching Amazon Linux instances",\n' +
    '        "AllowUnassociatedTargets": false,\n' +
    '        "Cutoff": 2,\n' +
    '        "Schedule": "cron(* 17 * * ? *)",\n' +
    '        "Duration": 6,\n' +
    '        "Name": "sc-ec2-ra-linux-maintenance-window"\n' +
    '      }\n' +
    '    },\n' +
    '    "LinuxMainteanceWindowTarget": {\n' +
    '      "Type": "AWS::SSM::MaintenanceWindowTarget",\n' +
    '      "Properties": {\n' +
    '        "OwnerInformation": "Service Catalog EC2 Reference Architecture",\n' +
    '        "Description": "Service Catalog EC2 Reference Architecture - Patch Maintenance for Amazon Linux Instances",\n' +
    '        "WindowId": {\n' +
    '          "Ref": "MaintenanceWindow"\n' +
    '        },\n' +
    '        "ResourceType": "INSTANCE",\n' +
    '        "Targets": [\n' +
    '          {\n' +
    '            "Key": "InstanceIds",\n' +
    '            "Values": [\n' +
    '              {\n' +
    '                "Ref": "WebServerInstance"\n' +
    '              }\n' +
    '            ]\n' +
    '          }\n' +
    '        ],\n' +
    '        "Name": "sc-ec2-ra-linux-patch-targets"\n' +
    '      }\n' +
    '    },\n' +
    '    "LinuxMaintenanceWindowTaskScan": {\n' +
    '      "Type": "AWS::SSM::MaintenanceWindowTask",\n' +
    '      "Properties": {\n' +
    '        "MaxErrors": 1,\n' +
    '        "Description": "Service Catalog EC2 Reference Architecture Maintenance Window Task: Scan for update for Amazon Linux Instance",\n' +
    '        "ServiceRoleArn": {\n' +
    '          "Fn::GetAtt": [\n' +
    '            "MaintenanceWindowRole",\n' +
    '            "Arn"\n' +
    '          ]\n' +
    '        },\n' +
    '        "Priority": 1,\n' +
    '        "MaxConcurrency": 1,\n' +
    '        "Targets": [\n' +
    '          {\n' +
    '            "Key": "InstanceIds",\n' +
    '            "Values": [\n' +
    '              {\n' +
    '                "Ref": "WebServerInstance"\n' +
    '              }\n' +
    '            ]\n' +
    '          }\n' +
    '        ],\n' +
    '        "Name": "patch-sc-ec2-ra-linux-nginx-instances",\n' +
    '        "TaskArn": "AWS-RunPatchBaseline",\n' +
    '        "WindowId": {\n' +
    '          "Ref": "MaintenanceWindow"\n' +
    '        },\n' +
    '        "TaskParameters": {\n' +
    '          "Operation": {\n' +
    '            "Values": [\n' +
    '              "Scan"\n' +
    '            ]\n' +
    '          }\n' +
    '        },\n' +
    '        "TaskType": "RUN_COMMAND"\n' +
    '      }\n' +
    '    },\n' +
    '    "LinuxMaintenanceWindowTaskInstall": {\n' +
    '      "Type": "AWS::SSM::MaintenanceWindowTask",\n' +
    '      "Properties": {\n' +
    '        "MaxErrors": 1,\n' +
    '        "Description": "Service Catalog EC2 RA Maintenance Window Task: Install update for Amazon Linux Instance",\n' +
    '        "ServiceRoleArn": {\n' +
    '          "Fn::GetAtt": [\n' +
    '            "MaintenanceWindowRole",\n' +
    '            "Arn"\n' +
    '          ]\n' +
    '        },\n' +
    '        "Priority": 2,\n' +
    '        "MaxConcurrency": 1,\n' +
    '        "Targets": [\n' +
    '          {\n' +
    '            "Key": "InstanceIds",\n' +
    '            "Values": [\n' +
    '              {\n' +
    '                "Ref": "WebServerInstance"\n' +
    '              }\n' +
    '            ]\n' +
    '          }\n' +
    '        ],\n' +
    '        "Name": "patch-sc-ec2-ra-linux-nginx-instances",\n' +
    '        "TaskArn": "AWS-RunPatchBaseline",\n' +
    '        "WindowId": {\n' +
    '          "Ref": "MaintenanceWindow"\n' +
    '        },\n' +
    '        "TaskParameters": {\n' +
    '          "Operation": {\n' +
    '            "Values": [\n' +
    '              "Install"\n' +
    '            ]\n' +
    '          }\n' +
    '        },\n' +
    '        "TaskType": "RUN_COMMAND"\n' +
    '      }\n' +
    '    }\n' +
    '  },\n' +
    '  "Outputs": {\n' +
    '    "WebsiteURL": {\n' +
    '      "Description": "DNS root URL of the new webserver",\n' +
    '      "Value": {\n' +
    '        "Fn::Join": [\n' +
    '          "",\n' +
    '          [\n' +
    '            "http://",\n' +
    '            {\n' +
    '              "Fn::GetAtt": [\n' +
    '                "WebServerInstance",\n' +
    '                "PublicDnsName"\n' +
    '              ]\n' +
    '            }\n' +
    '          ]\n' +
    '        ]\n' +
    '      }\n' +
    '    },\n' +
    '    "WebsiteIP": {\n' +
    '      "Description": "IP root URL of the new webserver",\n' +
    '      "Value": {\n' +
    '        "Fn::Join": [\n' +
    '          "",\n' +
    '          [\n' +
    '            "http://",\n' +
    '            {\n' +
    '              "Fn::GetAtt": [\n' +
    '                "WebServerInstance",\n' +
    '                "PublicIp"\n' +
    '              ]\n' +
    '            }\n' +
    '          ]\n' +
    '        ]\n' +
    '      }\n' +
    '    }\n' +
    '  }\n' +
    '}\n'
  );
};
