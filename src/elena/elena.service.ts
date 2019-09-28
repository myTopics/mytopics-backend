import { Injectable } from '@nestjs/common';
import { Article } from 'src/articles/interfaces/article.interface';

@Injectable()
export class ElenaService {
  process(articles: Article[]): Article[] {
    const child_process = require('child_process');
    const promisses = [];
    const newArticles = [];
    articles.forEach(article => {
      const input = JSON.stringify(article);
      const child = child_process.spawnSync(
        'python',
        ['src/articles/news.py'],
        {
          encoding: 'utf8',
        },
      );
      console.log('Process finished.');
      console.log('stdout: ', child.stdout);
      console.log('stderr: ', child.stderr);
      console.log('exist code: ', child.status);
      if (child.error) {
        console.log('ERROR: ', child.error);
      } else {
        articles.push(JSON.parse(child.stdout));
      }
    });
    return newArticles;
  }
}
