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
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

import { ReservationStatus } from '../../shared/enums/reservation-status.enum';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto, @Request() req) {
    return this.reservationsService.create(createReservationDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get('upcoming')
  findUpcoming() {
    return this.reservationsService.findUpcoming();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.reservationsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Put(':id/status/:status')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('status') status: ReservationStatus,
  ) {
    return this.reservationsService.updateStatus(id, status);
  }

  @Put(':id/check-in')
  checkIn(@Param('id', ParseUUIDPipe) id: string) {
    return this.reservationsService.checkIn(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.reservationsService.remove(id);
  }
}
