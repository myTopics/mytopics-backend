import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AggregatorModule } from './aggregator/aggregator.module';
import { ProcessorService } from './processor/processor.service';
import { ProcessorModule } from './processor/processor.module';

@Module({
  imports: [
    ArticlesModule,
    AggregatorModule,
    ProcessorModule,
  ],
  controllers: [AppController],
  providers: [AppService, ProcessorService],
})
export class AppModule {}
