// transport.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SolveTransportDto } from './dto/solve-transport.dto';
import { Model } from 'mongoose';
import {
  TransportVariant,
  TransportVariantDocument,
} from './schemas/transport-variant.schema';

@Injectable()
export class TransportService {
  constructor(
    @InjectModel(TransportVariant.name)
    private readonly transportModel: Model<TransportVariantDocument>,
  ) {}

  solve(dto: SolveTransportDto) {
    const { suppliers, consumers, costMatrix } = dto;
    const allocation = suppliers.map(() => consumers.map(() => 0));
    const supply = [...suppliers];
    const demand = [...consumers];

    const flat: { i: number; j: number; cost: number }[] = [];
    for (let i = 0; i < suppliers.length; i++) {
      for (let j = 0; j < consumers.length; j++) {
        flat.push({ i, j, cost: costMatrix[i][j] });
      }
    }
    flat.sort((a, b) => a.cost - b.cost);

    for (const { i, j } of flat) {
      const value = Math.min(supply[i], demand[j]);
      allocation[i][j] = value;
      supply[i] -= value;
      demand[j] -= value;
    }

    const totalCost = allocation.reduce(
      (sum, row, i) =>
        sum + row.reduce((rSum, x, j) => rSum + x * costMatrix[i][j], 0),
      0,
    );

    return {
      allocation,
      totalCost,
      balanced: supply.every((s) => s === 0) && demand.every((d) => d === 0),
    };
  }

  async solveAndSave(dto: SolveTransportDto, userId: string) {
    const result = this.solve(dto);

    const saved = await this.transportModel.create({
      userId,
      name: dto.name ?? 'Без названия',
      suppliers: [dto.suppliers],
      consumers: [dto.consumers],
      costMatrix: dto.costMatrix,
      allocation: result.allocation,
      totalCost: result.totalCost,
    });

    return saved;
  }
}
