// transport/transport.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransportController } from './transport.controller';
import { TransportService } from './transport.service';
import { TransportHistoryService } from './transport-history.service';
import {
  TransportVariant,
  TransportVariantSchema,
} from './schemas/transport-variant.schema';
import {
  TransportHistory,
  TransportHistorySchema,
} from './schemas/transport-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TransportVariant.name, schema: TransportVariantSchema },
      { name: TransportHistory.name, schema: TransportHistorySchema },
    ]),
  ],
  controllers: [TransportController],
  providers: [TransportService, TransportHistoryService],
})
export class TransportModule {}
