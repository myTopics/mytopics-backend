import { Injectable } from '@nestjs/common';
import { Article } from 'src/articles/interfaces/article.interface';

@Injectable()
export class ElenaService {
  async process(articles: Article[]): Promise<Article[]> {
    const spawn = require('child_process').spawn;
    const promisses = [];
    articles.forEach(article => {
      const input = JSON.stringify(article);
      console.dir(input);
      const process = spawn('python', [
        'src/articles/news.py',
        input,
      ]);
      promisses.push(
        new Promise<Article[]>((resolve, reject) => {
          process.stdout.on('data', data => {
            console.log('python success');
            console.log(data);
            resolve(JSON.parse(data));
          });
          process.stderr.on('data', data => {
              console.log('python failed');
              console.log(data);
            reject(JSON.parse(data));
          });
        }),
      );
    });
    return Promise.all<Article>(promisses);
  }
}
