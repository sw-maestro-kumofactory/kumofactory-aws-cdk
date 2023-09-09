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
            queue: 'aws-cdk-result',
            queueOptions: {
              durable: false,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
