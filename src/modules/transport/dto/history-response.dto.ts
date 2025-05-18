import { ApiProperty } from '@nestjs/swagger';

export class HistoryResponseDto {
  @ApiProperty({ description: 'ID пользователя' })
  userId: string;

  @ApiProperty({ description: 'ID варианта' })
  variantId: string;

  @ApiProperty({ description: 'Название расчета' })
  name: string;

  @ApiProperty({ description: 'Метод решения' })
  method: string;

  @ApiProperty({
    description: 'Массив поставщиков',
    type: 'array',
    items: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
  })
  suppliers: number[][];

  @ApiProperty({
    description: 'Массив потребителей',
    type: 'array',
    items: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
  })
  consumers: number[][];

  @ApiProperty({
    description: 'Матрица затрат',
    type: 'array',
    items: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
  })
  costMatrix: number[][];

  @ApiProperty({
    description: 'Матрица распределения',
    type: 'array',
    items: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
  })
  allocation: number[][];

  @ApiProperty({ description: 'Общая стоимость' })
  totalCost: number;

  @ApiProperty({ description: 'Дата создания' })
  createdAt: Date;

  @ApiProperty({ description: 'Дата обновления' })
  updatedAt: Date;
}
