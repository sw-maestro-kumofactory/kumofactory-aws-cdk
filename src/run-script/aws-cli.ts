import { execSync, spawnSync } from 'child_process';
import * as path from 'path';

export const runDeployByAwsCli = async (blueprintUuid: string) => {
  const currentPath = path.resolve();
  console.log(currentPath);
  // stack name => blueprint uuid
  const command: string = `aws cloudformation create-stack --stack-name ${blueprintUuid} --template-body file://${currentPath}/src/static/web-three-tier.yaml`;
  const stackId = execSync(command);
  console.log(`stackId : ${stackId}`);
};

export const deleteStack = async (stackId: string) => {
  const command: string = `aws cloudformation delete-stack --stack-name ${stackId}`;
  execSync(command);
};

export const getStackDescribe = async (stackId: string) => {
  // return outputs
  const command: string = `aws cloudformation describe-stacks --stack-name ${stackId}`;
  const result = execSync(command);
  const jsonString = JSON.parse(result.toString()).Stacks[0];
  console.log(jsonString);
  const outputs = jsonString.Outputs;
  return outputs;
};
