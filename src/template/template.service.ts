import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import {
  WebThreeTier,
  webThreeTierArchitecture,
} from './constants/templates.contants';
import { runDeployByAwsCli } from '../run-script/aws-cli';
import { MessageDto } from '../dto/message.dto';
import { AwsTemplateType } from '../type/aws-template.type';

@Injectable()
export class TemplateService {
  async deployWebThreeTierArchitecture(data: MessageDto[]) {
    const [key, ..._data] = data;
    const blueprintUuid = key.id;
    const type: WebThreeTier = this.createWebThreeTireTypes(_data);
    const content = webThreeTierArchitecture(type);

    // fs.writeFileSync(`${blueprintUuid}.yaml`, content);
    await runDeployByAwsCli(blueprintUuid, content);
  }

  createWebThreeTireTypes(_data: MessageDto[]): WebThreeTier {
    let type: WebThreeTier;
    _data.map((data) => {
      switch (data.type) {
        case AwsTemplateType.PUBLIC_INSTANCE1:
          type = {
            ...type,
            publicInstance1InstanceName: data.options.instanceName,
            publicInstance1Uuid: data.id,
            publicInstance1InstanceType: data.options.instanceType,
          };
          break;
        case AwsTemplateType.PUBLIC_INSTANCE2:
          type = {
            ...type,
            publicInstance2InstanceName: data.options.instanceName,
            publicInstance2Uuid: data.id,
            publicInstance2InstanceType: data.options.instanceType,
          };
          break;

        case AwsTemplateType.PRIVATE_INSTANCE1:
          type = {
            ...type,
            privateInstance1InstanceName: data.options.instanceName,
            privateInstance1Uuid: data.id,
            privateInstance1InstanceType: data.options.instanceType,
          };
          break;

        case AwsTemplateType.PRIVATE_INSTANCE2:
          type = {
            ...type,
            privateInstance2InstanceName: data.options.instanceName,
            privateInstance2Uuid: data.id,
            privateInstance2InstanceType: data.options.instanceType,
          };
          break;

        case AwsTemplateType.S3:
          type = {
            ...type,
            bucketName: data.options.bucketName,
          };
          break;
      }
    });

    return type;
  }
}
