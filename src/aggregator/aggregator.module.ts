import { Module } from '@nestjs/common';
import { MocknewsService } from './mocknews.service';

@Module({
  providers: [MocknewsService],
  controllers: [],
  exports: [MocknewsService],
})
export class AggregatorModule {}
