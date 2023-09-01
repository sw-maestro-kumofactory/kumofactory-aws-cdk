import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InstanceDocument = HydratedDocument<Instance>;

@Schema()
export class Instance {
  @Prop()
  resourceId: string;
}

export const InstanceSchema = SchemaFactory.createForClass(Instance);
