import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_PROVIDER } from './constants';

@Module({
  imports: [MongooseModule.forRoot(DB_PROVIDER)],
  controllers: [AppController, ArticlesController],
  providers: [AppService, ArticlesService],
})
export class AppModule {}
