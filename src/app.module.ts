import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';

@Module({
  imports: [],
  controllers: [AppController, ArticlesController],
  providers: [AppService, ArticlesService],
})
export class AppModule {}
