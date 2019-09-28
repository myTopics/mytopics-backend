import { Injectable } from '@nestjs/common';
import { Article } from './interfaces/article.interface';
import { MocknewsService } from '../aggregator/mocknews.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly mocknewsService: MocknewsService) {}

  findAll(): Article[] {
    return this.mocknewsService.findAll();
  }

  findById(articleId: string): Article {
    // TODO schema instead of article?
    return this.findAll().find(article => article.id === articleId);
  }

  findByTopic(topicId: string): Article[] {
    return this.findAll();
  }

  findByAnyTags(tags: string[]): Article[] {
    return this.findAll().map(article => {
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

  findByAllTags(tags: string[]): Article[] {
    // connect to db? query db?
    return this.findAll().map(article => {
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
