// transport/transport.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransportController } from './transport.controller';
import { TransportService } from './transport.service';
import {
  TransportVariant,
  TransportVariantSchema,
} from './schemas/transport-variant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TransportVariant.name, schema: TransportVariantSchema },
    ]),
  ],
  controllers: [TransportController],
  providers: [TransportService],
})
export class TransportModule {}
