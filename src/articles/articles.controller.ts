import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './interfaces/article.interface';
import { ElenaService } from '../elena/elena.service';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articleService: ArticlesService,
                private readonly elenaService: ElenaService) {}

    @Get('article/:id')
    async getById(@Param('id', new ParseIntPipe()) id): Promise<Article> {
        const article = this.articleService.findById(id);
        return article;
    }

    @Get()
    async getAll(): Promise<Article[]> {
      return this.elenaService.process(await this.articleService.findAll()); // todo await?
    }

    @Get(':topic')
    async getByTopic(@Param() params): Promise<Article[]> {
      return this.articleService.findByTopic(params.topic);
    }
}
