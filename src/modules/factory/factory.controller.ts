import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { FactoryService } from './factory.service';
import { FactoryCreateDto } from './dto/factory-create.dto';
import { FactoryUpdateDto } from './dto/factory-update.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FactoryResponseDto } from './dto/factory-response.dto';

@ApiTags('Factory')
@Controller('factory')
export class FactoryController {
  constructor(private readonly factoryService: FactoryService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все фабрики' })
  @ApiResponse({
    status: 200,
    description: 'Список всех фабрик успешно получен',
    type: [FactoryResponseDto],
  })
  async findAll() {
    return this.factoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить фабрику по id' })
  @ApiResponse({
    status: 200,
    description: 'Фабрика успешно найдена',
    type: FactoryResponseDto,
  })
  async findOne(@Param('id') id: string) {
    return this.factoryService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать фабрику' })
  @ApiResponse({
    status: 201,
    description: 'Фабрика успешно создана',
    type: FactoryCreateDto,
  })
  async create(@Body() dto: FactoryCreateDto) {
    return this.factoryService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить название фабрики' })
  @ApiResponse({
    status: 200,
    description: 'Фабрика успешно обновлена',
    type: FactoryUpdateDto,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: FactoryUpdateDto,
  ) {
    return this.factoryService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить фабрику' })
  async remove(@Param('id') id: string) {
    return this.factoryService.remove(id);
  }
}
