import { Inject, Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { InjectModel } from '@nestjs/mongoose';
import { CfnOutput } from '../domain/cfn-output.schema';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { getStackDescribe } from '../run-script/aws-cli';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(CfnOutput.name) private cfnOutputModel: Model<CfnOutput>,
    @Inject('CDK_SERVICE') private readonly client: ClientProxy,
  ) {}

  @SqsMessageHandler('run-cloudformation', false)
  async handleMessageRunCloudFormation(message: AWS.SQS.Message) {
    const sqs = new AWS.SQS();
    const obj: any = JSON.parse(message.Body) as {
      Type: string;
      MessageId: string;
      TopicArn: string;
      Message: string;
      Timestamp: string;
      SignatureVersion: string;
      Signature: string;
      SigningCertUrl: string;
    };
    const deleteParams = {
      QueueUrl:
        'https://sqs.ap-northeast-2.amazonaws.com/434126037102/run-cloudformation',
      ReceiptHandle: message.ReceiptHandle,
    };
    const json: any = JSON.parse(obj.Message);
    console.log(json);
    try {
      const blueprintUuid = json.resources[0];
      const sBlueprintUuid = blueprintUuid.split('/')[1];
      // console.log('blueprint Uuid ', sBlueprintUuid);
      // console.log('blueprint Uuid ', typeof sBlueprintUuid);
      const detail = JSON.parse(JSON.stringify(json.detail));
      // console.log(resource.split('/')[1]);
      const status = JSON.stringify(
        detail['status-details']['status'],
      ).toString();
      const stackId = JSON.stringify(detail['stack-id']);

      if (status == '"CREATE_COMPLETE"') {
        // status true 로 업데이트
        this.client
          .send('result', {
            id: sBlueprintUuid.substring(2),
            status: 'SUCCESS',
          })
          .subscribe();
        // output 결과 가져오기
        const outputs = await getStackDescribe(sBlueprintUuid);
        await this.saveOutputs(outputs, sBlueprintUuid.substring(2));

        // model 에 저장
      } else if (status === '"ROLLBACK_COMPLETE"') {
        // status fail 로 업데이트
        this.client
          .send('result', {
            id: sBlueprintUuid.substring(2),
            status: 'FAIL',
          })
          .subscribe();
      }
    } catch (e) {
      console.error(e);
    }
    sqs.deleteMessage(deleteParams, function (err, data) {
      if (err) {
        console.log('Delete Error', err);
      } else {
        console.log('Message Deleted', data);
      }
    });
  }

  async saveOutputs(outputs: any[], blueprintUuid: string) {
    // console.log(outputs);
    const result = [];
    let public1 = {};
    let public2 = {};
    let private1 = {};
    let private2 = {};
    let s3 = {};

    for (const output of outputs) {
      const jsonString = JSON.stringify(output);
      const parse = JSON.parse(jsonString);

      const outputKey = parse.OutputKey;
      const outputValue = parse.OutputValue;
      switch (outputKey) {
        case 'PublicInstance1PublicIP': // ip 주소
          public1 = {
            ...public1,
            publicIp: outputValue,
          };
          break;
        case 'PublicInstance1Name': // 인스턴스 이름
          public1 = {
            ...public1,
            instanceName: outputValue,
          };
          break;
        case 'PublicInstance1Id': // 인스턴스 아이디
          public1 = {
            ...public1,
            instanceId: outputValue,
          };
          break;
        case 'PublicInstance1Uuid': // client 에서 생성한 uuid
          public1 = {
            ...public1,
            uuid: outputValue,
          };
          break;
        case 'PublicInstance2PublicIP': // ip 주소
          public2 = {
            ...public2,
            publicIp: outputValue,
          };
          break;
        case 'PublicInstance2Name': // 인스턴스 이름
          public2 = {
            ...public2,
            instanceName: outputValue,
          };
          break;
        case 'PublicInstance2Id': // 인스턴스 아이디
          public2 = {
            ...public2,
            instanceId: outputValue,
          };
          break;
        case 'PublicInstance2Uuid': // client 에서 생성한 uuid
          public2 = {
            ...public2,
            uuid: outputValue,
          };
          break;

        case 'PrivateInstance1PrivateIP': // ip 주소
          private1 = {
            ...private1,
            privateId: outputValue,
          };
          break;
        case 'PrivateInstance1Name': // 인스턴스 이름
          private1 = {
            ...private1,
            instanceName: outputValue,
          };
          break;
        case 'PrivateInstance1Id': // 인스턴스 아이디
          private1 = {
            ...private1,
            instanceId: outputValue,
          };
          break;
        case 'PrivateInstance1Uuid': // client 에서 생성한 uuid
          private1 = {
            ...private1,
            uuid: outputValue,
          };
          break;

        case 'PrivateInstance2PrivateIP': // ip 주소
          private2 = {
            ...private1,
            privateIp: outputValue,
          };
          break;
        case 'PrivateInstance2Name': // 인스턴스 이름
          private2 = {
            ...private1,
            instanceName: outputValue,
          };
          break;
        case 'PrivateInstance2Id': // 인스턴스 아이디
          private2 = {
            ...private1,
            instanceId: outputValue,
          };
          break;
        case 'PrivateInstance2Uuid': // client 에서 생성한 uuid
          private2 = {
            ...private1,
            uuid: outputValue,
          };
          break;
        case 'BucketArn':
          s3 = {
            ...s3,
            arn: outputValue,
          };
          break;
        case 'BucketDomainName':
          s3 = {
            ...s3,
            domain: outputValue,
          };
      }
    }

    result.push(public1);
    result.push(public2);
    result.push(private1);
    result.push(private2);
    result.push(s3);

    const model = new this.cfnOutputModel({
      key: blueprintUuid,
      result: { ...result },
    });

    await model.save();
  }
}
