import { Vehicle } from 'src/vehicles/schemas/vehicle.schema';

export class CreateUserDto {
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly vehicle: Vehicle;
  readonly confirmPassword: string;
}
