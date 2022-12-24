import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
import { VehiclesModule } from './vehicles/vehicles.module';

const mongoURI = env.MONGO_URI;
@Module({
  imports: [MongooseModule.forRoot(mongoURI), VehiclesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
