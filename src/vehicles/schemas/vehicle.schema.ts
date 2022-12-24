import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema()
export class Vehicle {
  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  color: string;

  @Prop()
  year: string;

  @Prop({ required: true, default: true })
  available: boolean;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
