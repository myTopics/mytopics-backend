import { Injectable } from '@nestjs/common';
import { Article } from './interfaces/article.interface';

@Injectable()
export class ArticlesService {
  private readonly articles: Article[] = [];

  findAll(): Article[] {
    return this.articles;
  }

  findById(articleId: string): Article {
      // TODO schema instead of article?
    return this.articles.find(article => article.id === articleId);
  }

  findByTopic(topicId: string): Article[] {
    return this.articles;
  }

  findByAnyTags(tags: string[]): Article[] {
    return this.articles.map(article => {
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
    return this.articles.map(article => {
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
