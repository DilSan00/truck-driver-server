import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class TransportHistory extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  variantId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  suppliers: number[][];

  @Prop({ required: true })
  consumers: number[][];

  @Prop({ required: true })
  costMatrix: number[][];

  @Prop({ required: true })
  allocation: number[][];

  @Prop({ required: true })
  totalCost: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const TransportHistorySchema =
  SchemaFactory.createForClass(TransportHistory);
