import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from '../../shared/enums/order-status.enum';
import { OrderItemStatus } from '../../shared/enums/order-item-status.enum';
import { CreatePaymentDto } from '../payments/dto/create-payment.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Public()
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    return this.ordersService.create(createOrderDto, req.user.id);
  }

  @Public()
  @Get()
  findAll(@Query('status') status?: OrderStatus) {
    if (status) {
      return this.ordersService.findByStatus(status);
    }
    return this.ordersService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @Public()
  @Get('table/:tableId')
  findByTable(@Param('tableId', ParseUUIDPipe) tableId: string) {
    return this.ordersService.findByTable(tableId);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Put(':id/status/:status')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('status') status: OrderStatus,
  ) {
    return this.ordersService.updateStatus(id, status);
  }

  @Put(':orderId/items/:itemId/status/:status')
  updateOrderItemStatus(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @Param('status') status: OrderItemStatus,
  ) {
    return this.ordersService.updateOrderItemStatus(orderId, itemId, status);
  }

  @Public()
  @Get(':id/total')
  calculateTotal(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.calculateTotal(id);
  }

  @Public()
  @Post(':id/payments')
  addPayment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    return this.ordersService.addPaymentToOrder(
      id,
      createPaymentDto.method,
      createPaymentDto.amount,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.remove(id);
  }
}
