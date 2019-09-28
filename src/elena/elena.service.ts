import { Injectable } from '@nestjs/common';
import { Article } from 'src/articles/interfaces/article.interface';

@Injectable()
export class ElenaService {
  process(articles: Article[]): Article[] {
    const childProcess = require('child_process');
    const newArticles = [];
    articles.forEach(article => {
      const input = JSON.stringify([article]);
      console.dir(input);
      const child = childProcess.spawnSync(
        'python',
        ['src/articles/news.py', input],
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
      } else if (child.stdout) {
        newArticles.push(JSON.parse(child.stdout));
      }
    });
    return newArticles;
  }
}
