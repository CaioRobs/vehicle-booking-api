import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Vehicle } from 'src/vehicles/schemas/vehicle.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  vehicle: Vehicle | null;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserWithoutPassword = Omit<User, 'password'>;
