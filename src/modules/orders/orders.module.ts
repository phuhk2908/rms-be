import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Table } from '../tables/entities/table.entity';
import { User } from '../users/entities/user.entity';
import { MenuItem } from '../menu-items/entities/menu-item.entity';
import { MenuItemsModule } from '../menu-items/menu-items.module';
import { TablesModule } from '../tables/tables.module';
import { UsersModule } from '../users/users.module';
import { PaymentsModule } from '../payments/payments.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Table, User, MenuItem]),
    MenuItemsModule,
    forwardRef(() => TablesModule),
    UsersModule,
    PaymentsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
