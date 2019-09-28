import { Injectable } from '@nestjs/common';
import { Article } from '../articles/interfaces/article.interface';

@Injectable()
export class MocknewsService {
  private readonly articles: Article[] = [
    {
      id: 'woodstock',
      source:
        'https://brica.de/alerts/alert/public/1278623/woodstock-city-police-targeted-by-cyber-attack',
      title: 'Woodstock city, police targeted by \'cyber attack\'',
      summary:
        'The City of Woodstock and the Woodstock Police Service are both currently suffering cyber attacks. Woodstock’s top administrator, David Creery, confirmed the city had a network breach early Saturday morning around 4 a.m. when a virus entered its computer syst…',
      image: null,
      date: new Date('2019-09-28T10:24:00Z'),
      text:
        'The City of Woodstock and the Woodstock Police Service are both currently suffering cyber attacks.Woodstocks top administrator, David Creery, confirmed the city had a network breach early Saturday morning around 4 a.m. when a virus entered its computer system… [+3600 chars]',
      tags: [
        { title: 'bitcoin', occurrence: 10 },
        { title: 'music', occurrence: 5 },
      ],
      sentiment: null,
      author: null,
      decisions: [{ link: 'https://woodstock.org', title: 'Woodstock home' }],
    },
    {
      id: 'centos',
      title: 'CentOS 8 dig command not found – How to install dig on CentOS 8',
      summary:
        'I deployed minimal version of CentOS 8 in the cloud server. However, I am unable to find the dig command on my newly created CentOS 8 Linux server. It says \'-bash: dig: command not found\' I tried yum install dig, but it failed too. How do I install dig comman…',
      source:
        'https://www.cyberciti.biz/faq/centos-8-dig-command-not-found-how-to-install-dig-on-centos-8/',
      image:
        'https://www.cyberciti.biz/media/new/faq/2019/09/CentOS-8-dig-command-not-found.png',
      date: new Date('2019-09-28T09:14:10Z'),
      text:
        'I deployed minimal version of CentOS 8 in the cloud server. However, I am unable to find the dig command on my newly created CentOS 8 Linux server. It says ‘-bash: dig: command not found‘ I tried yum install dig, but it failed too. How do I install dig comman… [+5443 chars]',
      tags: [
        { title: 'bitcoin', occurrence: 10 },
        { title: 'centos', occurrence: 5 },
      ],
      sentiment: null,
      author: null,
      decisions: [
        { link: 'https://centos.org', title: 'CentOS home' },
        { link: 'https://bitcoin.org', title: 'Bitcoin home' },
      ],
    },
    {
      id: 'satoshi',
      title: 'Satoshi Nakaboto: ‘Bitcoin inches up after four-day free fall’',
      summary: 'Satoshi Nakaboto: ‘Bitcoin inches up after four-day free fall’',
      source:
        'https://cc.thenextweb.com/post/187998479425/httpsthenextwebcomhardfork20190928satoshi-nakab',
      image:
        'https://66.media.tumblr.com/490f4958bacda3491b624d49da0a17a6/tumblr_pyjavyT74e1qejjfeo1_1280.jpg',
      date: new Date('2019-09-28T09:11:58Z'),
      text:
        'Satoshi Nakaboto: ‘Bitcoin inches up after four-day free fall’. However, I am unable to find the dig command on my newly created CentOS 8 Linux server. It says ‘-bash: dig: command not found‘ I tried yum install dig. Bitcoin cash etc.',
      tags: [
        { title: 'bitcoin', occurrence: 10 },
        { title: 'satoshi', occurrence: 5 },
      ],
      sentiment: null,
      author: null,
      decisions: [
        { link: 'https://satoshi.org', title: 'Satoshi home' },
        { link: 'https://bitcoin.org', title: 'Bitcoin home' },
      ],
    },
  ];

  findAll(): Article[] {
    return this.articles;
  }
}
