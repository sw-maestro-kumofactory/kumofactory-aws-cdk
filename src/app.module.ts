import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AwsCdkService } from './global/aws-cdk.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GlobalModule } from './global/global.module';
import { Instance, InstanceSchema } from './domain/instance.schema';
import { HttpModule } from '@nestjs/axios';
import { CfnOutput, CfnOutputSchema } from './domain/cfn-output.schema';
import * as AWS from 'aws-sdk';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MessageService } from './message/message.service';

AWS.config.update({
  region: 'ap-northeast-2',
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './env',
    }),
    // mongodb://root:ie7wi3aM@54.180.91.183
    // mongodb://root:qwer1234@localhost
    MongooseModule.forRoot('mongodb://root:ie7wi3aM@54.180.91.183', {
      dbName: 'aws',
    }),
    MongooseModule.forFeature([
      { name: Instance.name, schema: InstanceSchema },
      { name: CfnOutput.name, schema: CfnOutputSchema },
    ]),
    HttpModule,
    SqsModule.register({
      consumers: [
        {
          name: 'run-cloudformation',
          queueUrl:
            'https://sqs.ap-northeast-2.amazonaws.com/434126037102/run-cloudformation',
          region: 'ap-northeast-2',
        },
      ],
      producers: [],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AwsCdkService,
    {
      provide: 'CDK_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            // amqp://guest:guest@localhost:5672
            // amqp://guest:guest@rabbitmq:5672
            urls: ['amqp://guest:guest@rabbitmq:5672'],
            queue: 'aws-cdk-result',
            queueOptions: {
              durable: false,
            },
          },
        });
      },
      inject: [ConfigService],
    },
    MessageService,
  ],
})
export class AppModule {}
