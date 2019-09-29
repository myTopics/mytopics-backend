import { Injectable } from '@nestjs/common';
import { Article } from './interfaces/article.interface';
import { GnewsService } from '../aggregator/gnews.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly newsService: GnewsService) {}

  async findAll(): Promise<Article[]> {
    const json = await this.newsService.findAll();
    // tslint:disable-next-line:no-string-literal
    return json['articles'].map(article => {
      console.dir(article);
      const art = this.newsService.toArticle(article);
      console.dir(art);
      if (art) {
        return art;
      }
      return false;
    });
  }

  async queryAll(query: string): Promise<Article[]> {
    const json = await this.newsService.findByQuery(query);
    // tslint:disable-next-line:no-string-literal
    return json['articles'].map(article => {
      const art = this.newsService.toArticle(article);
      if (art) {
        return art;
      }
      return false;
    });
  }
}
