import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Workshop, WorkshopDocument } from './schemas/workshop.schema';
import { Model } from 'mongoose';
import { WorkshopCreateDto } from './dto/workshop-create.dto';
import { WorkshopUpdateDto } from './dto/workshop-update.dto';

@Injectable()
export class WorkshopService {
  constructor(
    @InjectModel(Workshop.name) private workshopModel: Model<WorkshopDocument>,
  ) {}

  async findAll() {
    return this.workshopModel.find().exec();
  }

  async findById(id: string) {
    return this.workshopModel.findById(id);
  }

  async create(dto: WorkshopCreateDto): Promise<WorkshopDocument> {
    const created = new this.workshopModel(dto);
    return created.save();
  }

  async update(
    id: string,
    dto: WorkshopUpdateDto,
  ): Promise<WorkshopDocument | null> {
    return this.workshopModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string): Promise<WorkshopDocument | null> {
    return this.workshopModel.findByIdAndDelete(id).exec();
  }
}
