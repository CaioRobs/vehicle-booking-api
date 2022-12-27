import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
@ApiTags('Users')
export class User {
  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop({ required: true, unique: true })
  @ApiProperty()
  username: string;

  @Prop({ required: true, unique: true })
  @ApiProperty()
  email: string;

  @Prop({ required: true, select: false })
  @ApiProperty()
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  @ApiProperty({
    description: 'Vehicle id in case the user currently has one',
  })
  vehicle: mongoose.Types.ObjectId | null;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserWithoutPassword = Omit<User, 'password'>;
