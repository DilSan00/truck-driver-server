import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { TransportService } from './transport.service';
import { SolveTransportDto } from './dto/solve-transport.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TransportHistoryService } from './transport-history.service';
import { HistoryResponseDto } from './dto/history-response.dto';

@ApiTags('Transport')
@Controller('transport')
export class TransportController {
  constructor(
    private readonly transportService: TransportService,
    private readonly historyService: TransportHistoryService,
  ) {}

  @Get('history/:userId')
  @ApiOperation({ summary: 'Получить историю заказа' })
  @ApiResponse({
    status: 200,
    description: 'История заказов успешно получена',
    type: [HistoryResponseDto],
  })
  async getHistory(@Param('userId') userId: string) {
    return this.historyService.getUserHistory(userId);
  }

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
  solve(@Body() dto: SolveTransportDto) {
    return this.transportService.solve(dto);
  }
}
