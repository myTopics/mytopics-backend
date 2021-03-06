import { Injectable } from '@nestjs/common';
import { Article } from 'src/articles/interfaces/article.interface';

@Injectable()
export class ProcessorService {
  getInput(article: Article): string {
    return JSON.stringify({
      id: article.id,
      text: article.text.replace(/[^ a-zA-Z0-9]+/g, ''),
      image: article.image ? article.image.replace(/^https?/g, '') : null,
    });
  }
  process(articles: Article[]): Article[] {
    const childProcess = require('child_process');
    const newArticles = [];
    articles.forEach(article => {
      if (!article.text) {
        newArticles.push(article);
      } else if (article) {
        const input = this.getInput(article);
        const child = childProcess.spawnSync(
          'python',
          ['src/articles/news.py', input],
          {
            encoding: 'utf8',
          },
        );
        if (child.error) {
          console.log('ERROR: ', child.error);
          console.log('stdout: ', child.stdout);
          console.log('stderr: ', child.stderr);
          console.log('exist code: ', child.status);
        } else if (child.stdout) {
          const result = JSON.parse(child.stdout);
          const tags = [];
          result.tags.forEach(tag => {
            tags.push({ title: tag.NAME, occurrence: Math.random() });
          });
          article.tags = tags;
          newArticles.push(article);
        }
      }
    });
    return this.processDecisions(newArticles);
  }
  processDecisions(articles: Article[]): Article[] {
    articles.forEach(article => {
      articles.forEach(articleCompare => {
        if (article !== articleCompare && article.tags && articleCompare.tags && article.decisions.length < 3) {
          article.tags.forEach(tag => {
            articleCompare.tags.forEach(tagCompare => {
              if (tag.title === tagCompare.title && !article.decisions.find(x => x.link === articleCompare.id)) {
                article.decisions.push({
                  title: articleCompare.title,
                  link: articleCompare.id,
                });
              }
            });
          });
        }
      });
    });
    return articles;
  }
}
