import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './interfaces/article.interface';
import { Decision } from './interfaces/decision.interface';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articleService: ArticlesService) {}

    @Get('article/:id')
    getById(@Param('id', new ParseIntPipe()) id): Article {
        return this.articleService.findById(id);
    }

    @Get()
    getAll(): Article[] {
      return this.articleService.findAll();
    }

    @Get(':topic')
    getByTopic(@Param() params): Article[] {
      return this.articleService.findByTopic(params.topic);
    }
}
