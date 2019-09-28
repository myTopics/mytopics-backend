import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { AggregatorModule } from '../aggregator/aggregator.module';

@Module({
  providers: [ArticlesService],
  controllers: [ArticlesController],
  imports: [AggregatorModule],
  exports: [ArticlesService],
})
export class ArticlesModule {}
