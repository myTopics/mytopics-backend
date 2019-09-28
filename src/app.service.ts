import { Injectable } from '@nestjs/common';
import { GnewsService } from './aggregator/gnews.service';
import { Article } from './articles/interfaces/article.interface';

@Injectable()
export class AppService {
  id: number;
  constructor(private readonly gnewsService: GnewsService) {
    this.id = 0;
  }
  async getHello(): Promise<object> {
    // tslint:disable
    const json = await this.gnewsService.findAll();
    return json;
  }
}
