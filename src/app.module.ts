import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './modules/entities/customer/customer.module';
import { MeasureModule } from './modules/entities/measures/measure.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GeminiModule } from './modules/gemini/gemini.module';
import { DevService } from './database/services/dev.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DevService,
    }),
    CustomerModule,
    MeasureModule,
    GeminiModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
