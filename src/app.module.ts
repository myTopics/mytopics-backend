import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_PROVIDER } from './constants';
import { AggregatorModule } from './aggregator/aggregator.module';

@Module({
  imports: [
    MongooseModule.forRoot(DB_PROVIDER),
    ArticlesModule,
    AggregatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
