import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InfraCostDocument = HydratedDocument<InfraCost>;

@Schema()
export class InfraCost {
  @Prop({ type: String })
  _id: string;

  @Prop({ type: Object })
  result: Object;
}

export const InfraCostSchema = SchemaFactory.createForClass(InfraCost);