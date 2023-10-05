import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Req,
  Res,
  Sse,
} from '@nestjs/common';
import { AppService } from './app.service';
import * as cdk from 'aws-cdk-lib';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import {
  deleteStack,
  getStackDescribe,
  runDeployByAwsCli,
} from './run-script/aws-cli';
import * as Path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern()
  async deploy(
    @Payload() data: Record<string, unknown>,
    @Ctx() context: RmqContext,
  ) {
    console.log(`CONTROLLER ${JSON.stringify(data)}`);
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    channel.ack(originalMessage);

    const _data: any = data;
    const result = await this.appService.synthCdk(_data);

    return 'hello';
  }

  @Get('/test/:uuid')
  async test(@Param() params: any) {
    await runDeployByAwsCli(params.uuid);
    return 'test';
  }

  @Get('/stack/deletion/:stackId')
  async deleteStack(@Param() params: any) {
    await deleteStack(params.stackId);
    return 'deleted';
  }

  @Get('/test2')
  async test2() {
    const result = await getStackDescribe('hello1');
    console.log(result);
    return 'test2';
  }
}
