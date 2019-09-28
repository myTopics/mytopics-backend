import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { AggregatorModule } from '../aggregator/aggregator.module';
import { ProcessorModule } from '../processor/processor.module';

@Module({
  providers: [ArticlesService],
  controllers: [ArticlesController],
  imports: [AggregatorModule, ProcessorModule],
  exports: [ArticlesService],
})
export class ArticlesModule {}
