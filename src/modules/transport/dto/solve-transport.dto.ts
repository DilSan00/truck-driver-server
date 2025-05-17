// transport/dto/solve-transport.dto.ts
import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SolveTransportDto {
  @ApiProperty({
    description: 'Массив предложений (количество товара у поставщиков)',
    example: [100, 200, 300],
    type: [Number],
  })
  @IsArray()
  suppliers: number[];

  @ApiProperty({
    description: 'Массив спроса (количество товара, необходимое потребителям)',
    example: [150, 250, 200],
    type: [Number],
  })
  @IsArray()
  consumers: number[];

  @ApiProperty({
    description: 'Матрица стоимости перевозок',
    example: [
      [2, 3, 4],
      [3, 2, 5],
      [4, 5, 2],
    ],
    type: 'array',
    items: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
  })
  @IsArray()
  costMatrix: number[][];

  @ApiProperty({
    description: 'Метод решения транспортной задачи',
    example: 'northwest',
    required: false,
    enum: ['northwest', 'minimum', 'vogel'],
  })
  @IsOptional()
  @IsString()
  method?: string;

  @ApiProperty({
    description: 'Название транспортной задачи',
    example: 'Тестовая задача',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;
}
