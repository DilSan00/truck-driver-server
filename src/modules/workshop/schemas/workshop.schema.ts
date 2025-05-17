import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkshopDocument = Workshop & Document;

@Schema()
export class Workshop {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  tons: number;
}

export const WorkshopSchema = SchemaFactory.createForClass(Workshop);
