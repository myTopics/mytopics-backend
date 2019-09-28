import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';

@Module({
    providers: [ArticlesService],
    controllers: [ArticlesController],
    exports: [ArticlesService, ArticlesController],
})
export class ArticlesModule {}
