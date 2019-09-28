import { Module } from '@nestjs/common';
import { MocknewsService } from './mocknews.service';
import { GnewsService } from './gnews.service';

@Module({
  providers: [MocknewsService, GnewsService],
  controllers: [],
  exports: [MocknewsService, GnewsService],
})
export class AggregatorModule {}
