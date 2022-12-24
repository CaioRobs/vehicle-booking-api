import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle, VehicleDocument } from './schemas/vehicle.schema';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const createdVehicle = new this.vehicleModel(createVehicleDto);
    return createdVehicle.save();
  }

  findAll(): Promise<Vehicle[]> {
    return this.vehicleModel.find().exec();
  }

  findOne(id: string): Promise<Vehicle | null> {
    return this.vehicleModel.findById(id).exec();
  }

  async reserveVehicle(id: string): Promise<Vehicle | null> {
    const prePatchVehicle = await this.vehicleModel.findById(id).exec();

    if (prePatchVehicle === null) return prePatchVehicle;
    if (!prePatchVehicle.available) throw new Error('Vehicle not available');

    prePatchVehicle.available = false;
    prePatchVehicle.save();

    return prePatchVehicle;
  }

  async returnVehicle(id: string): Promise<Vehicle | null> {
    const prePatchVehicle = await this.vehicleModel.findById(id).exec();

    if (prePatchVehicle === null) return prePatchVehicle;
    if (prePatchVehicle.available) throw new Error('Vehicle already avaliable');

    prePatchVehicle.available = true;
    prePatchVehicle.save();

    return prePatchVehicle;
  }
}
