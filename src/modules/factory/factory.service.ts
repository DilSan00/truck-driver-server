import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Factory, FactoryDocument } from './schemas/factory.schema';
import { Model } from 'mongoose';
import { FactoryCreateDto } from './dto/factory-create.dto';
import { FactoryUpdateDto } from './dto/factory-update.dto';

@Injectable()
export class FactoryService {
  constructor(
    @InjectModel(Factory.name) private factoryModel: Model<FactoryDocument>,
  ) {}

  async findAll() {
    return this.factoryModel.find().exec();
  }

  async findById(id: string) {
    return this.factoryModel.findById(id);
  }

  async create(dto: FactoryCreateDto): Promise<FactoryDocument> {
    const created = new this.factoryModel(dto);
    return created.save();
  }

  async update(
    id: string,
    dto: FactoryUpdateDto,
  ): Promise<FactoryDocument | null> {
    return this.factoryModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string): Promise<FactoryDocument | null> {
    return this.factoryModel.findByIdAndDelete(id).exec();
  }
}
