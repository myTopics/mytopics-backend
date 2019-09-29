import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './interfaces/article.interface';
import { ProcessorService } from '../processor/processor.service';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articleService: ArticlesService,
    private readonly processorService: ProcessorService,
  ) {}
  @Get()
  async getAll(): Promise<Article[]> {
    // return await this.articleService.findAll();
    const articles = await this.articleService.findAll();
    return this.processorService.process(articles); // todo await?
  }
  @Get(':topic')
  async queryAll(@Param('topic')topic: string): Promise<Article[]> {
    // return await this.articleService.queryAll(topic);
    const articles = await this.articleService.queryAll(topic);
    return this.processorService.process(articles); // todo await?
  }
}
