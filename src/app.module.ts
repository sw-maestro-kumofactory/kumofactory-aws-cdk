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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './env',
    }),
    MongooseModule.forRoot('mongodb://root:qwer1234@localhost', {
      dbName: 'nest',
    }),
    GlobalModule,
    MongooseModule.forFeature([
      { name: Instance.name, schema: InstanceSchema },
      { name: CfnOutput.name, schema: CfnOutputSchema },
    ]),
    HttpModule,
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
            urls: ['amqp://guest:guest@rabbitmq:5672'],
            queue: 'kumofactory-queue2',
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
