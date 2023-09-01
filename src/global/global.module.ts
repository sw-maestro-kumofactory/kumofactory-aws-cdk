import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Instance, InstanceSchema } from '../domain/instance.schema';
import { AwsCdkService } from './aws-cdk.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Instance.name, schema: InstanceSchema },
    ]),
  ],

  providers: [AwsCdkService],
})
export class GlobalModule {}
