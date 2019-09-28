import { Injectable } from '@nestjs/common';
import { GnewsService } from './aggregator/gnews.service';
import { Article } from './articles/interfaces/article.interface';

@Injectable()
export class AppService {
  constructor(private readonly gnewsService: GnewsService) {}
  getHello(): Article[] {
    const json = this.gnewsService.findAll();

    return [];
  }
}
