import { exec } from 'aws-cdk/lib';

export const runCloudformationDeploy = async () => {
  await exec([
    'deploy',
    '--all',
    '--require-approval',
    'never',
    '--outputs-file',
    `./outputs.json`,
  ]);
};
