import { Module } from '@nestjs/common';
import { DecisionsService } from './decisions.service';
import { DecisionsController } from './decisions.controller';

@Module({
  providers: [DecisionsService],
  controllers: [DecisionsController],
  exports: [DecisionsService],
})
export class DecisionsModule {}
