import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Factory {
  @Prop({ require: true })
  title: string;

  @Prop({ required: true })
  tons: number;
}

export type FactoryDocument = Factory & Document;
export const FactorySchema = SchemaFactory.createForClass(Factory);
