import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';

const mongoURI = env.MONGO_URI;
@Module({
  imports: [MongooseModule.forRoot(mongoURI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
