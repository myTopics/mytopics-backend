import { Injectable } from '@nestjs/common';
import { Article } from '../articles/interfaces/article.interface';
import * as NewsAPI from 'newsapi';
const newsapi = new NewsAPI('YOUR_API_KEY');

@Injectable()
export class GnewsService {
  id: number;
  newsapi: NewsAPI;
  constructor() {
    this.newsapi = new NewsAPI('fa67798007d44de282aafd702bdc4ce5');
  }
  async findAll(): Promise<object> {
    this.id = 0; // TODO
    return this.newsapi.v2.topHeadlines({
      language: 'en',
    });
  }
  async findByQuery(query: string): Promise<object> {
    return this.newsapi.v2.topHeadlines({
      language: 'en',
      q: query,
    });
  }
  toArticle(article): Article {
    const art = {
      id: this.getHashCode(article.title).toString(),
      author: article.author,
      source: article.url,
      summary: article.description,
      title: article.title,
      image: article.urlToImage,
      date: new Date(article.publishedAt),
      text: article.content,
      tags: null,
      decisions: null,
      sentiment: null,
    };
    if (art.id && art.title && art.text && art.summary) {
      return art;
    }
    return null;
  }
  getHashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const character = str.charCodeAt(i);
      // tslint:disable-next-line:no-bitwise
      hash = (hash << 5) - hash + character;
      // tslint:disable-next-line:no-bitwise
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
}
