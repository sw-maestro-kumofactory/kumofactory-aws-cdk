import { execSync, spawnSync } from 'child_process';
import {
  CloudFormationClient,
  CreateStackCommand,
  DescribeStacksCommand,
} from '@aws-sdk/client-cloudformation';
import * as path from 'path';

const client = new CloudFormationClient();

export const runDeployByAwsCli = async (
  blueprintUuid: string,
  content: string,
) => {
  // const currentPath = path.resolve();
  // console.log(currentPath);
  // stack name => blueprint uuid
  // const command: string = `aws cloudformation create-stack --stack-name v1${blueprintUuid} --template-body file://${currentPath}/${blueprintUuid}.yaml`;
  // const stackId = execSync(command);
  const input = {
    StackName: `v1${blueprintUuid}`,
    TemplateBody: content,
  };
  const command = new CreateStackCommand(input);
  const response = client.send(command);
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
    StackName: stackId,
  });

  const result = await client.send(command);
  console.log(result.Stacks[0].Outputs);
  return result.Stacks[0].Outputs;
};
