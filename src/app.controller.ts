import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import * as cdk from 'aws-cdk-lib';
import {
  AccessScopeType,
  AvailabilityZoneType,
} from './cdk/ec2/type/instance.type';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { MessageDto } from './dto /message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern()
  async getP2(
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

  @Get()
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }
}
