import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Factory {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  tons: number;
}

export const FactorySchema = SchemaFactory.createForClass(Factory);

@Schema()
export class Workshop {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  tons: number;
}

export const WorkshopSchema = SchemaFactory.createForClass(Workshop);
