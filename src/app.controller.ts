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
import { NewMessageDto } from './dto/new-message.dto';
import { MessageDto } from './dto/message.dto';
import { TemplateService } from './template/template.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly templateService: TemplateService,
  ) {}

  @MessagePattern('USER')
  async deploy(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    const _data = JSON.parse(data);
    channel.ack(originalMessage);
    const result = await this.appService.synthCdk(_data);

    return 'hello';
  }

  @MessagePattern('KUMO')
  async deployTemplate(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    const _data = JSON.parse(data);
    channel.ack(originalMessage);
    await this.templateService.deployWebThreeTierArchitecture(_data);
    return 'helloworld';
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
    // const result = await getStackDescribe('hello1');
    // await this.templateService.createWebThreeTierArchitecture();
    return 'test2';
  }
}
