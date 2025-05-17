import { Body, Controller, Post } from '@nestjs/common';
import { TransportService } from './transport.service';
import { SolveTransportDto } from './dto/solve-transport.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Transport')
@Controller('transport')
export class TransportController {
  constructor(private readonly transportService: TransportService) {}

  @Post('solve')
  @ApiOperation({
    summary: 'Решить транспортную задачу',
    description:
      'Решает транспортную задачу с использованием указанного метода',
  })
  @ApiResponse({
    status: 200,
    description: 'Транспортная задача успешно решена',
    schema: {
      type: 'object',
      properties: {
        solution: {
          type: 'array',
          items: {
            type: 'array',
            items: {
              type: 'number',
            },
          },
          example: [
            [50, 50, 0],
            [100, 0, 100],
            [0, 200, 100],
          ],
        },
        totalCost: {
          type: 'number',
          example: 1250,
        },
        method: {
          type: 'string',
          example: 'northwest',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Неверные входные данные',
  })
  solve(@Body() dto: SolveTransportDto) {
    return this.transportService.solve(dto);
  }
}
