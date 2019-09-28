import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Article } from './articles/interfaces/article.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<object> {
    return await this.appService.getHello();
  }
}
