import { MongooseModule } from '@nestjs/mongoose';
import { Factory, FactorySchema } from './schemas/factory.schema';
import { Module } from '@nestjs/common';
import { FactoryController } from './factory.controller';
import { FactoryService } from './factory.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Factory.name,
        schema: FactorySchema,
      },
    ]),
  ],
  controllers: [FactoryController],
  providers: [FactoryService],
})
export class FactoryModule {}
