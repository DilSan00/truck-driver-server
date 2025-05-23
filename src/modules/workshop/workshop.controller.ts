import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { WorkshopService } from './workshop.service';
import { WorkshopCreateDto } from './dto/workshop-create.dto';
import { WorkshopUpdateDto } from './dto/workshop-update.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WorkshopResponseDto } from './dto/workshop-response.dto';

@ApiTags('Workshop')
@Controller('workshop')
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все мастерские' })
  @ApiResponse({
    status: 200,
    description: 'Список всех мастерских успешно получен',
    type: [WorkshopResponseDto],
  })
  async findAll() {
    return this.workshopService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить мастерскую по id' })
  @ApiResponse({
    status: 200,
    description: 'Мастерская успешно найдена',
    type: WorkshopResponseDto,
  })
  async findOne(@Param('id') id: string) {
    return this.workshopService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать мастерскую' })
  @ApiResponse({
    status: 201,
    description: 'Мастерская успешно создана',
    type: WorkshopCreateDto,
  })
  async create(@Body() dto: WorkshopCreateDto) {
    return this.workshopService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить название мастерской' })
  @ApiResponse({
    status: 200,
    description: 'Мастерская успешно обновлена',
    type: WorkshopUpdateDto,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: WorkshopUpdateDto,
  ) {
    return this.workshopService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить мастерскую' })
  async remove(@Param('id') id: string) {
    return this.workshopService.remove(id);
  }
}
