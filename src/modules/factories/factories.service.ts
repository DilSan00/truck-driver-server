import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Factories, FactoriesDocument } from './schemas/factories.schema';
import { Model } from 'mongoose';

@Injectable()
export class FactoriesService {
  constructor(
    @InjectModel(Factories.name)
    private factoriesModel: Model<FactoriesDocument>,
  ) {}

  async solveTransportTask(id: string) {
    const data = await this.factoriesModel.findById(id).exec();
    if (!data) {
      throw new Error('No such factories set');
    }

    const supply = data.factories.map((f) => f.tons); // фабрики
    const demand = data.workshops.map((w) => w.tons); // цеха
    const cost = data.cost;

    const result: { from: string; to: string; tons: number; cost: number }[] =
      [];

    const usedFactories = new Array(supply.length).fill(0);
    const usedWorkshops = new Array(demand.length).fill(0);

    while (true) {
      let minCost = Infinity;
      let i = -1,
        j = -1;

      // Найдём минимальную стоимость среди доступных
      for (let fi = 0; fi < supply.length; fi++) {
        if (supply[fi] === 0) continue;

        for (let wi = 0; wi < demand.length; wi++) {
          if (demand[wi] === 0) continue;

          if (cost[fi][wi] < minCost) {
            minCost = cost[fi][wi];
            i = fi;
            j = wi;
          }
        }
      }

      if (i === -1 || j === -1) break; // всё распределили

      const tonsToMove = Math.min(supply[i], demand[j]);

      result.push({
        from: data.factories[i].title,
        to: data.workshops[j].title,
        tons: tonsToMove,
        cost: tonsToMove * cost[i][j],
      });

      supply[i] -= tonsToMove;
      demand[j] -= tonsToMove;
    }

    return result;
  }
}
