import { Injectable } from '@nestjs/common';
import { Article } from 'src/articles/interfaces/article.interface';
import { Tag } from 'src/articles/interfaces/tag.interface';

@Injectable()
export class ProcessorService {
  process(articles: Article[]): Article[] {
    const childProcess = require('child_process');
    const newArticles = [];
    console.dir(articles);
    articles.forEach(article => {
      if (article) {
        const input = JSON.stringify({
          id: article.id,
          text: article.text.replace(/[^ a-zA-Z0-9]+/g, ''),
        });
        console.log('input python:');
        console.dir(input);
        const child = childProcess.spawnSync(
          'python',
          [
            'src/articles/news.py',
            input,
          ],
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
          const result = JSON.parse(child.stdout);
          console.dir(result);
          const calcTags = [];
          result.tags.forEach(tag => {
            calcTags.push({ title: tag.title, occurrence: Math.random() });
          });
          newArticles.push({
            title: article.title,
            tags: calcTags,
            source: article.source,
            author: article.author,
            sentiment: result.sentiment,
            summary: article.summary,
            image: article.image,
            text: article.text,
            date: article.date,
            id: article.id,
            decisions: article.decisions,
          });
        }
      }
    });
    return newArticles;
  }
}
