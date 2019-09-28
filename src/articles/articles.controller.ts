import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './interfaces/article.interface';
import { ElenaService } from '../elena/elena.service';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articleService: ArticlesService,
                private readonly elenaService: ElenaService) {}

    @Get('article/:id')
    getById(@Param('id', new ParseIntPipe()) id): Article {
        const article = this.articleService.findById(id);
        return article;
    }

    @Get()
    getAll(): Article[] {
      return this.elenaService.process(this.articleService.findAll());
    }

    @Get(':topic')
    getByTopic(@Param() params): Article[] {
      return this.articleService.findByTopic(params.topic);
    }
}
