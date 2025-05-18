import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransportHistory } from './schemas/transport-history.schema';
import { SolveTransportDto } from './dto/solve-transport.dto';

@Injectable()
export class TransportHistoryService {
  constructor(
    @InjectModel(TransportHistory.name)
    private readonly historyModel: Model<TransportHistory>,
  ) {}

  async createHistory(
    userId: string,
    variantId: string,
    dto: SolveTransportDto,
    result: { allocation: number[][]; totalCost: number },
  ) {
    return this.historyModel.create({
      userId,
      variantId,
      name: dto.name ?? 'Без названия',
      method: dto.method,
      suppliers: [dto.suppliers],
      consumers: [dto.consumers],
      costMatrix: dto.costMatrix,
      allocation: result.allocation,
      totalCost: result.totalCost,
    });
  }

  async getUserHistory(userId: string) {
    return this.historyModel.find({ userId }).sort({ createdAt: -1 });
  }

  async getVariantHistory(variantId: string) {
    return this.historyModel.find({ variantId }).sort({ createdAt: -1 });
  }
}
