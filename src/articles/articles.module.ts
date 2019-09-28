import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { AggregatorModule } from '../aggregator/aggregator.module';
import { ElenaModule } from '../elena/elena.module';

@Module({
  providers: [ArticlesService],
  controllers: [ArticlesController],
  imports: [AggregatorModule, ElenaModule],
  exports: [ArticlesService],
})
export class ArticlesModule {}
