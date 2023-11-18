import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { deleteStack, getStackDescribe } from './run-script/aws-cli';
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

  @MessagePattern('COST')
  async cost(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    const _data = JSON.parse(data);
    channel.ack(originalMessage);
    const result = await this.appService.costCdk(_data);

    return 'hello';
  }

  @Get('/stack/deletion/:stackId')
  async deleteStack(@Param() params: any) {
    await deleteStack(params.stackId);
    return 'deleted';
  }

  // api to get cost of stack
  @Get('/stack/cost/:stackId')
  async getCost(@Param() params: any) {
    
    return "result";
  }
}
 