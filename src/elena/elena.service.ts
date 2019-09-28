import { Injectable } from '@nestjs/common';
import { Article } from 'src/articles/interfaces/article.interface';

@Injectable()
export class ElenaService {
    process(articles: Article[]): Article[] {
        // TODO magic
        return articles;
    }
}
