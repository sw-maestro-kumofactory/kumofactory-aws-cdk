import { execSync, spawnSync } from "child_process";
import {
  CloudFormationClient,
  CreateStackCommand,
  DescribeStacksCommand
} from "@aws-sdk/client-cloudformation";
import * as path from "path";
import * as AWS from "aws-sdk";

AWS.config.update({ region: "ap-northeast-2" });

const client = new CloudFormationClient();

export const runDeployByAwsCli = async (
  blueprintUuid: string,
  content: string
) => {
  // const currentPath = path.resolve();
  // console.log(currentPath);
  // stack name => blueprint uuid
  // const command: string = `aws cloudformation create-stack --stack-name v1${blueprintUuid} --template-body file://${currentPath}/${blueprintUuid}.yaml`;
  // const stackId = execSync(command);
  try {
    const command = new CreateStackCommand({
      StackName: `v1${blueprintUuid}`,
      TemplateBody: content,
      Capabilities: ["CAPABILITY_IAM"]
    });
    const response = client.send(command);
  } catch (e) {
    console.error("RUN DEPLOY BY AWS CLI : ", e);
    throw e;
  }
};

export const deleteStack = async (stackId: string) => {
  const command: string = `aws cloudformation delete-stack --stack-name ${stackId}`;

  execSync(command);
};

export const getStackDescribe = async (stackId: string) => {
  // return outputs
  // const command: string = `aws cloudformation describe-stacks --stack-name ${stackId}`;
  // const result = execSync(command);
  // const jsonString = JSON.parse(result.toString()).Stacks[0];
  // console.log(jsonString);
  // const outputs = jsonString.Outputs;

  const command = new DescribeStacksCommand({
    StackName: stackId
  });

  return await client.send(command);
};
