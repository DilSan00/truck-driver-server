import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Factory,
  FactorySchema,
  Workshop,
  WorkshopSchema,
} from './objects.schema';
import { Document } from 'mongoose';

const text = {
  factories: [
    { title: 'title1', tons: 20 },
    { title: 'title2', tons: 40 },
  ],
  workshop: [
    { title: 'm1', tons: 19 },
    { title: 'm2', tons: 40 },
  ],
};

@Schema()
export class Factories {
  @Prop({ type: [FactorySchema], required: true })
  factories: Factory[];

  @Prop({ type: [WorkshopSchema], required: true })
  workshops: Workshop[];

  @Prop({ type: [[Number]], required: true })
  cost: number[][];
}

export type FactoriesDocument = Factories & Document;
export const FactoriesSchema = SchemaFactory.createForClass(Factories);
