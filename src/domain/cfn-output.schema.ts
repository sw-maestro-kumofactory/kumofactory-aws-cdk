import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CfnOutputDocument = HydratedDocument<CfnOutput>;

@Schema()
export class CfnOutput {
  @Prop({ type: String })
  key: string;

  @Prop({ type: Object })
  result: Object;
}

export const CfnOutputSchema = SchemaFactory.createForClass(CfnOutput);
