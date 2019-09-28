import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_PROVIDER } from './constants';
import { AggregatorModule } from './aggregator/aggregator.module';
import { ElenaService } from './elena/elena.service';
import { ElenaModule } from './elena/elena.module';

@Module({
  imports: [
    MongooseModule.forRoot(DB_PROVIDER),
    ArticlesModule,
    AggregatorModule,
    ElenaModule,
  ],
  controllers: [AppController],
  providers: [AppService, ElenaService],
})
export class AppModule {}
