import { Injectable } from '@nestjs/common';
import { Article } from './interfaces/article.interface';
import { GnewsService } from '../aggregator/gnews.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly newsService: GnewsService) {}

  async findAll(): Promise<Article[]> {
    const json = await this.newsService.findAll();
    // tslint:disable-next-line:no-string-literal
    return json['articles'].map(article => this.newsService.toArticle(article));
  }

  async findById(articleId: string): Promise<Article> {
    articleId = articleId.toString();
    return (await this.findAll()).find(article => article.id === articleId);
  }

  async findByTopic(topicId: string): Promise<Article[]> {
    return this.findAll();
  }

  async findByAnyTags(tags: string[]): Promise<Article[]> {
    return (await this.findAll()).map(article => {
      if (
        tags.map(tag => {
          return true; // TODO
          //   return article.tags.keys().(tag);
        }).length > 0
      ) {
        return article;
      }
    });
  }

  async findByAllTags(tags: string[]): Promise<Article[]> {
    // connect to db? query db?
    return (await this.findAll()).map(article => {
      if (
        tags.map(tag => {
          return true; // TODO
          //   return article.tags.includes(tag);
        }).length === tags.length
      ) {
        return article;
      }
    });
  }
}
