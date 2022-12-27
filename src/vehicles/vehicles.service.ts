import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle, VehicleDocument } from './schemas/vehicle.schema';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
    private userService: UsersService,
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

  async reserveVehicle(id: string, requestUser: User): Promise<Vehicle | null> {
    const prePatchVehicle = await this.vehicleModel.findById(id).exec();

    if (prePatchVehicle === null) return prePatchVehicle;
    if (!prePatchVehicle.available) throw new Error('Vehicle not available');

    await this.userService.addVehicle(requestUser.email, prePatchVehicle);

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
