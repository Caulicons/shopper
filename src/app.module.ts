import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevService } from './db/services/dev.service';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './modules/entities/customer/customer.module';
import { MeasureModule } from './modules/entities/measures/measure.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DevService,
    }),
    CustomerModule,
    MeasureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
