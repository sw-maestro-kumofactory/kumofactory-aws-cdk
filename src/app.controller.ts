import { Controller, Get, Inject, Res, Sse } from '@nestjs/common';
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
}
