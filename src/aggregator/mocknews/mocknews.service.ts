import { Injectable } from '@nestjs/common';
import { Article } from '../../articles/interfaces/article.interface';

@Injectable()
export class MocknewsService {
  findAll(): Article[] {
    return [];
  }
}
