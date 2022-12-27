import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { UsersModule } from 'src/users/users.module';
import { Vehicle, VehicleSchema } from './schemas/vehicle.schema';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Vehicle.name, schema: VehicleSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService],
  exports: [MongooseModule],
})
export class VehiclesModule {}
