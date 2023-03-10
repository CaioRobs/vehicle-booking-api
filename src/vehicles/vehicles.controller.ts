import {
  Controller,
  Get,
  Patch,
  Param,
  NotFoundException,
  BadRequestException,
  Res,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './schemas/vehicle.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('vehicles')
@UseGuards(JwtAuthGuard)
@ApiTags('Vehicles')
@ApiBearerAuth()
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

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
  async reserveVehicle(@Param('id') id: string, @Req() request: any) {
    try {
      const vehicle = await this.vehiclesService.reserveVehicle(
        id,
        request.user,
      );
      this.verifyVehicle(vehicle);
      return;
    } catch (error) {
      this.verifyError(error);
    }
  }

  @Patch('return/:id')
  async returnVehicle(@Param('id') id: string, @Req() request: any) {
    try {
      const vehicle = await this.vehiclesService.returnVehicle(
        id,
        request.user,
      );
      this.verifyVehicle(vehicle);
      return;
    } catch (error) {
      this.verifyError(error);
    }
  }

  verifyVehicle = (vehicle: Vehicle) => {
    if (vehicle === null) throw new NotFoundException('Vehicle not found');
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

    if (error.message.includes('User already got vehicle'))
      throw new BadRequestException('User already got vehicle');

    if (error.message.includes("User don't have any vehicle"))
      throw new BadRequestException("User don't have any vehicle");

    if (error.message.includes('User can only return its own vehicle'))
      throw new BadRequestException('User can only return its own vehicle');
    else throw error;
  };
}
