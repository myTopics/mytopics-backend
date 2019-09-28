import { Injectable } from '@nestjs/common';
import { ArticlesService } from '../articles/articles.service';
import { Article } from '../articles/interfaces/article.interface';
import { Decision } from './interfaces/decision.interface';

@Injectable()
export class DecisionsService {
  constructor(private readonly articleService: ArticlesService) {}

  findByArticleId(articleId: string) {
      return this.findByArticle(this.articleService.findById(articleId)); // TODO?
  }

  findByArticle(article: Article): Decision[] {
    return [
        {title: 'Next big thing', link: 'https://test.com'},
        {title: 'Maybe interesting for you', link: 'https://test.com'},
        {title: 'Read Me!', link: 'https://test.com'},
    ];
  }
}
