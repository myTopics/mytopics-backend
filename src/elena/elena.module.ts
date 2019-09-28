import { Module } from '@nestjs/common';
import { ElenaService } from './elena.service';

@Module({
  providers: [ElenaService],
  exports: [ElenaService],
})
export class ElenaModule {}
