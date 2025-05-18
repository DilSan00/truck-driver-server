// transport.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SolveTransportDto } from './dto/solve-transport.dto';
import { Model, Document } from 'mongoose';
import {
  TransportVariant,
  TransportVariantDocument,
} from './schemas/transport-variant.schema';
import { TransportHistoryService } from './transport-history.service';

@Injectable()
export class TransportService {
  constructor(
    @InjectModel(TransportVariant.name)
    private readonly transportModel: Model<TransportVariantDocument>,
    private readonly historyService: TransportHistoryService,
  ) {}

  solve(dto: SolveTransportDto) {
    const { suppliers, consumers, costMatrix, method } = dto;

    let allocation: number[][];

    if (method === 'northwest') {
      allocation = this.northwestMethod(suppliers, consumers);
    } else {
      // default: минимальная стоимость (как сейчас)
      allocation = suppliers.map(() => consumers.map(() => 0));
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
    }

    const totalCost = allocation.reduce(
      (sum, row, i) =>
        sum + row.reduce((rSum, x, j) => rSum + x * costMatrix[i][j], 0),
      0,
    );

    return {
      allocation,
      totalCost,
      balanced: true,
    };
  }

  async solveAndSave(dto: SolveTransportDto, userId: string) {
    const result = this.solve(dto);

    const saved = (await this.transportModel.create({
      userId,
      name: dto.name ?? 'Без названия',
      suppliers: [dto.suppliers],
      consumers: [dto.consumers],
      costMatrix: dto.costMatrix,
      allocation: result.allocation,
      totalCost: result.totalCost,
    })) as Document & { _id: { toString(): string } };

    // Сохраняем в историю
    await this.historyService.createHistory(
      userId,
      saved._id.toString(),
      dto,
      result,
    );

    return saved;
  }

  private northwestMethod(
    suppliers: number[],
    consumers: number[],
  ): number[][] {
    const allocation = suppliers.map(() => consumers.map(() => 0));
    const supply = [...suppliers];
    const demand = [...consumers];

    let i = 0;
    let j = 0;

    while (i < supply.length && j < demand.length) {
      const value = Math.min(supply[i], demand[j]);
      allocation[i][j] = value;
      supply[i] -= value;
      demand[j] -= value;

      if (supply[i] === 0) i++;
      else if (demand[j] === 0) j++;
    }

    return allocation;
  }
}
