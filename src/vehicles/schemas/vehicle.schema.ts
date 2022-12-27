import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema({ timestamps: true })
@ApiTags('Vehicles')
export class Vehicle {
  @Prop({ required: true })
  @ApiProperty()
  brand: string;

  @Prop({ required: true })
  @ApiProperty()
  model: string;

  @Prop({ required: true })
  @ApiProperty()
  color: string;

  @Prop()
  @ApiProperty()
  year: string;

  @Prop({ required: true, default: true })
  @ApiProperty({
    description: 'whether the car is available or not',
    default: false,
  })
  available: boolean;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
