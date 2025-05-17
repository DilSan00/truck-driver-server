// transport/schemas/transport-variant.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransportVariantDocument = TransportVariant & Document;

@Schema({ timestamps: true })
export class TransportVariant {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string; // название расчёта

  @Prop({ type: [[Number]], required: true })
  suppliers: number[][];

  @Prop({ type: [[Number]], required: true })
  consumers: number[][];

  @Prop({ type: [[Number]], required: true })
  costMatrix: number[][];

  @Prop({ type: [[Number]], required: true })
  allocation: number[][];

  @Prop({ required: true })
  totalCost: number;
}

export const TransportVariantSchema =
  SchemaFactory.createForClass(TransportVariant);
