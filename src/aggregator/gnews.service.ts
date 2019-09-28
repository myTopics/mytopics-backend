import { Injectable } from '@nestjs/common';
import { Article } from '../articles/interfaces/article.interface';
import * as NewsAPI from 'newsapi';
const newsapi = new NewsAPI('YOUR_API_KEY');

@Injectable()
export class GnewsService {
  newsapi: NewsAPI;
  constructor() {
    this.newsapi = new NewsAPI('fa67798007d44de282aafd702bdc4ce5');
  }

  async findAll(): Promise<object> {
    return this.newsapi.v2.topHeadlines({
      language: 'en',
    });
  }
}
