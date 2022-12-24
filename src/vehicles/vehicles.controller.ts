import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  NotFoundException,
  BadRequestException,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './schemas/vehicle.schema';
import { Response } from 'express';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const vehicles = await this.vehiclesService.findAll();
    if (vehicles.length === 0) return res.status(HttpStatus.NO_CONTENT).send();
    return res.status(HttpStatus.OK).json(vehicles);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const vehicle = await this.vehiclesService.findOne(id);
      this.verifyVehicle(vehicle);
      return vehicle;
    } catch (error) {
      this.verifyError(error);
    }
  }

  @Patch('reserve/:id')
  async reserveVehicle(@Param('id') id: string) {
    try {
      const vehicle = await this.vehiclesService.reserveVehicle(id);
      this.verifyVehicle(vehicle);
      return;
    } catch (error) {
      this.verifyError(error);
    }
  }

  @Patch('return/:id')
  async returnVehicle(@Param('id') id: string) {
    try {
      const vehicle = await this.vehiclesService.returnVehicle(id);
      this.verifyVehicle(vehicle);
      return;
    } catch (error) {
      this.verifyError(error);
    }
  }

  verifyVehicle = (vehicle: Vehicle) => {
    if (vehicle === null) throw new NotFoundException();
  };

  verifyError = (error: Error) => {
    if (error.message.includes('Cast to ObjectId'))
      throw new BadRequestException('Invalid ID', {
        cause: error,
        description: error.message,
      });

    if (error.message.includes('Vehicle not available'))
      throw new BadRequestException('Vehicle not available');

    if (error.message.includes('Vehicle already avaliable'))
      throw new BadRequestException('Vehicle already avaliable');
    else throw error;
  };
}
