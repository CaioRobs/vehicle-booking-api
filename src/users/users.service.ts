import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Types, Model } from 'mongoose';
import { Vehicle } from 'src/vehicles/schemas/vehicle.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

type vehicleWithId = Document<unknown, any, Vehicle> &
  Vehicle & {
    _id: Types.ObjectId;
  } & Required<{
    _id: Types.ObjectId;
  }>;
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('+password').exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password === createUserDto.confirmPassword) {
      const { confirmPassword, ...user } = createUserDto;
      const createdUser = new this.userModel(user);
      return createdUser.save();
    }
  }

  async addVehicle(email: string, vehicle: vehicleWithId): Promise<void> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user.vehicle) throw new Error('User already got vehicle');
    user.vehicle = vehicle._id;
    user.save();
    return;
  }

  async removeVehicle(email: string, vehicle: vehicleWithId): Promise<void> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user.vehicle) throw new Error("User don't have any vehicle");

    if (!vehicle._id.equals(user.vehicle))
      throw new Error('User can only return its own vehicle');

    user.vehicle = null;
    user.save();
    return;
  }
}
