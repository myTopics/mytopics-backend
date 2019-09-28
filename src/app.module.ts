import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_PROVIDER } from './constants';
import { ArticlesModule } from './articles/articles.module';

import { DecisionsModule } from './decisions/decisions.module';

@Module({
  imports: [MongooseModule.forRoot(DB_PROVIDER), ArticlesModule, DecisionsModule],
  controllers: [AppController, ArticlesController],
  providers: [AppService],
})
export class AppModule {}
