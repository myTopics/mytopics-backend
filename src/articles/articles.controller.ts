import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './interfaces/article.interface';
import { ProcessorService } from '../processor/processor.service';
import { resolve } from 'url';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articleService: ArticlesService,
    private readonly processorService: ProcessorService,
  ) {}
  @Get()
  async getAll(): Promise<Article[]> {
    // return await this.articleService.findAll();
    const articles = await this.articleService.findAll();
    return this.processorService.process(articles); // todo await?
  }
  msleep(n): void {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
  }
  sleep(n): void {
    this.msleep(n * 1000);
  }
  @Get(':topic')
  async queryAll(@Param('topic') topic: string): Promise<Article[]> {
    if (topic.toLowerCase() === 'trump') {
      this.sleep(4);
      return this.mockTrump();
    }
    // return await this.articleService.queryAll(topic);
    const articles = await this.articleService.queryAll(topic);
    return this.processorService.process(articles); // todo await?
  }
  mockTrump(): Article[] {
    return [
      {
        id: '1949753124',
        author: 'Josh Ocampo',
        source:
          'https://lifehacker.com/is-it-illegal-for-a-president-to-make-money-from-outsid-1837982914',
        summary:
          'Last week, Vice President Mike Pence visited Dublin, Ireland to attend several meetings—but confusingly, stayed at a Trump hotel nearly 200 miles away. Just yesterday, the U.S. Air Force came under scrutiny for overnight stays at a Trump hotel in Scotland whi…',
        title:
          'Is It Illegal for a President to Make Money From Outside Businesses While in Office?',
        image:
          'https://i.kinja-img.com/gawker-media/image/upload/s--1pYFYQXd--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/pjgzla8bd0quuhmsxrbx.jpg',
        date: new Date('2019-09-10T13:00:00.000Z'),
        text:
          'Last week, Vice President Mike Pence visited Dublin, Ireland to attend several meetingsbut confusingly, stayed at a Trump hotel nearly 200 miles away. Just yesterday, the U.S. Air Force came under scrutiny for overnight stays at a Trump hotel in Scotland whil… [+4197 chars]',
        tags: [
          { title: 'Mike Pence', occurrence: 0.5248769143627163 },
          { title: 'Dublin', occurrence: 0.660443764546131 },
          { title: 'Donald Trump', occurrence: 0.297248409749824 },
          { title: 'United States Air Force', occurrence: 0.434453432540145 },
          { title: 'Scotland', occurrence: 0.9554713776924184 },
        ],
        decisions: [
          {
            title: "The Fight Over California's Emissions Rules Just Got Real",
            link: '-803260838',
          },
          {
            title: 'Yes, Trump Is Guilty, but Impeachment Is a Mistake',
            link: '-2051071204',
          },
          {
            title:
              'With Markers and Straws, Trump’s Campaign Sells Defiance as a Lifestyle',
            link: '-1300675428',
          },
        ],
        sentiment: null,
      },
      {
        id: '-243287060',
        author: 'Josh Ocampo',
        source:
          'https://lifehacker.com/watch-nancy-pelosi-announce-a-formal-impeachment-inquir-1838415354',
        summary:
          'After hesitating to pull the trigger for months, this afternoon, House Speaker Nancy Pelosi announced plans to launch a formal impeachment inquiry into President Donald Trump. Read more...',
        title:
          'Watch Nancy Pelosi Announce a Formal Impeachment Inquiry into the President',
        image:
          'https://i.kinja-img.com/gawker-media/image/upload/s--lk91L_zI--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/i9mh3s6se7e4n1ycy7ur.jpg',
        date: new Date('2019-09-24T21:45:00.000Z'),
        text:
          'After hesitating to pull the trigger for months, this afternoon, House Speaker Nancy Pelosi announced plans to launch a formal impeachment inquiry into President Donald Trump.\r\nThe actions taken to date by the president have seriously violated the Constitutio… [+1640 chars]',
        tags: [
          { title: 'House', occurrence: 0.18923970117586464 },
          { title: 'Nancy Pelosi', occurrence: 0.4131795974345198 },
          { title: 'Donald', occurrence: 0.33843422638833554 },
        ],
        decisions: [
          {
            title:
              "Chrissy Teigen unpacks her viral feud with Trump on 'Ellen'",
            link: '773189522',
          },
          {
            title:
              'Trump impeachment could derail administration’s maneuvers in tech',
            link: '1499675254',
          },
        ],
        sentiment: null,
      },
      {
        id: '-231471515',
        author: 'Charlie Savage',
        source:
          'https://www.nytimes.com/2019/09/20/us/whistleblower-law-explained.html',
        summary:
          'Congress and the Trump administration are in a standoff over a secret complaint related to President Trump and Ukraine.',
        title: 'Intelligence Whistle-Blower Law, Explained',
        image:
          'https://static01.nyt.com/images/2019/09/20/us/politics/20dc-legal/20dc-legal-facebookJumbo.jpg',
        date: new Date('2019-09-22T14:48:48.000Z'),
        text:
          'Mr. Maguires top lawyer, Jason Klitenic, has maintained that it is lawful for Mr. Maguire to withhold the complaint from Congress. Mr. Klitenic, who said he consulted the Justice Department, has made arguments in letters to Mr. Schiff both about how he interp… [+2160 chars]',
        tags: [
          { title: 'Jason Klitenic', occurrence: 0.66072435223151 },
          { title: 'Maguire', occurrence: 0.8602484631116638 },
          { title: 'Congress', occurrence: 0.5480242936599646 },
          { title: 'Klitenic', occurrence: 0.2302314539014494 },
          {
            title: 'United States Department of Justice',
            occurrence: 0.6005659322359531,
          },
          { title: 'Schiff', occurrence: 0.21208323944471985 },
        ],
        decisions: [],
        sentiment: null,
      },
      {
        id: '-1496835350',
        author: 'Arman Tabatabai',
        source:
          'http://techcrunch.com/2019/09/09/international-students-face-immigration-hurdles-under-trump/',
        summary:
          'This fall, nearly half a million international students will begin or return to STEM programs at U.S. colleges and universities. If you’re among them, look forward to being wooed by talent-hungry...',
        title: 'International students face immigration hurdles under Trump',
        image:
          'https://techcrunch.com/wp-content/uploads/2019/09/GettyImages-483247038-e1568061492493.jpg?w=457',
        date: new Date('2019-09-09T20:39:40.000Z'),
        text:
          'More posts by this contributor\r\nThis fall, nearlyhalf a million international students will begin or return to STEM degree programs at U.S. colleges and universities. If youre among them, congratulations look forward to being wooed by talent-hungry U.S. tech … [+10179 chars]',
        tags: [{ title: 'United States', occurrence: 0.20888333158635208 }],
        decisions: [
          {
            title: 'Trump not interested in talking Huawei with China',
            link: '-646426251',
          },
        ],
        sentiment: null,
      },
      {
        id: '-1938762766',
        author: null,
        source:
          'https://www.cnn.com/videos/politics/2019/08/30/cuomo-closing-argument-trump-supporters-lying-about-lying-vpx.cnn',
        summary:
          "CNN's Chris Cuomo addresses the people within President Trump's inner circle who actively lie about the president lying.",
        title: 'Cuomo revisits Trump supporters lying about Trump lying',
        image:
          'https://cdn.cnn.com/cnnnext/dam/assets/190829224738-cuomo-closing-argument-super-tease.jpg',
        date: new Date('2019-08-30T04:28:39.000Z'),
        text:
          "Chat with us in Facebook Messenger. Find out what's happening in the world as it unfolds.",
        tags: [],
        decisions: [],
        sentiment: null,
      },
      {
        id: '1053282847',
        author: 'Bret Stephens',
        source: 'https://www.nytimes.com/2019/09/19/opinion/trump-iran.html',
        summary:
          'The president combines the rhetorical impulses of Bob Dornan with the strategic instincts of Dennis Kucinich.',
        title: 'The Trump Doctrine, Revealed',
        image:
          'https://static01.nyt.com/images/2019/09/19/opinion/19stephensWeb/19stephensWeb-facebookJumbo.jpg',
        date: new Date('2019-09-19T10:16:49.000Z'),
        text:
          'What would Irans leaders really fear? Above all, a revival of the Green Movement that nearly toppled the regime following the stolen presidential election of 2009. As Omid Memarian of the Center for Human Rights in Iran noted recently in Foreign Affairs, The … [+2484 chars]',
        tags: [
          { title: 'Green Movement (Israel)', occurrence: 0.47127252611818404 },
          { title: 'Asia', occurrence: 0.6810922489968974 },
          { title: 'Omid Memarian', occurrence: 0.5172435429761233 },
          { title: 'Center for Human Rights', occurrence: 0.7834112507910873 },
          { title: 'Iran', occurrence: 0.4724906925452024 },
          { title: 'Foreign Affairs', occurrence: 0.6060257159922304 },
        ],
        decisions: [],
        sentiment: null,
      },
      {
        id: '-1664209724',
        author: 'The Editorial Board',
        source:
          'https://www.nytimes.com/2019/09/18/opinion/california-clean-air-trump.html',
        summary:
          'To dismantle the Obama climate legacy, he’s taking on California, the auto industry, the Clean Air Act and public opinion.',
        title: 'Trump Muddies the Air',
        image:
          'https://static01.nyt.com/images/2019/09/18/opinion/18trumpcalifornia/18trumpcalifornia-facebookJumbo-v2.jpg',
        date: new Date('2019-09-18T23:50:37.000Z'),
        text:
          'One problem with Californias aggressiveness is that it created a two-tier market for automakers one set of cars for California and states that had joined in, another for the rest of the country. To address that, in 2009 President Obama forged a major agreemen… [+1545 chars]',
        tags: [
          { title: 'The Californias', occurrence: 0.25425858924928013 },
          { title: 'California', occurrence: 0.26889438875827754 },
          { title: 'Toronto', occurrence: 0.503158869713527 },
          { title: 'Barack Obama', occurrence: 0.6465135075137372 },
          { title: 'Obama', occurrence: 0.255764769490636 },
        ],
        decisions: [
          {
            title: 'Trump Inspires California Lawmakers to Go on Offense',
            link: '-325164590',
          },
        ],
        sentiment: null,
      },
      {
        id: '-803260838',
        author: 'Aarian Marshall',
        source:
          'https://www.wired.com/story/fight-californias-emissions-rules-real/',
        summary:
          "The Trump administration plans to revoke California's authority to set regulations for vehicle fuel economy and emissions, likely setting up a court fight.",
        title: "The Fight Over California's Emissions Rules Just Got Real",
        image:
          'https://media.wired.com/photos/5d826d8856f23f000821a1ad/master/w_2560,c_limit/Transpo_CAemissions_1036646528.jpg',
        date: new Date('2019-09-18T20:42:48.000Z'),
        text:
          'After two-plus years of preparation, President Trump tweeted Wednesday that the US Environmental Protection Agency would revoke Californias ability to set its own fuel efficiency rulesa power that the state has used for decades to strongarm automakers into bu… [+3513 chars]',
        tags: [
          { title: 'Donald Trump', occurrence: 0.3327871196850012 },
          { title: 'Trump', occurrence: 0.3438485024057272 },
          {
            title: 'United States Environmental Protection Agency',
            occurrence: 0.13628461204000897,
          },
        ],
        decisions: [
          {
            title:
              'Is It Illegal for a President to Make Money From Outside Businesses While in Office?',
            link: '1949753124',
          },
          {
            title: 'Yes, Trump Is Guilty, but Impeachment Is a Mistake',
            link: '-2051071204',
          },
          {
            title:
              'With Markers and Straws, Trump’s Campaign Sells Defiance as a Lifestyle',
            link: '-1300675428',
          },
        ],
        sentiment: null,
      },
      {
        id: '-417648649',
        author: 'Maureen Dowd',
        source:
          'https://www.nytimes.com/2019/09/14/opinion/sunday/democrats-debate-trump.html',
        summary: 'Trump changed the game forever.',
        title: 'Let’s Debate: Are Democrats Doomed?',
        image:
          'https://static01.nyt.com/images/2019/09/15/opinion/sunday/15Dowd/15Dowd-facebookJumbo.jpg',
        date: new Date('2019-09-14T22:58:06.000Z'),
        text:
          'The bulb that were being forced to use No. 1, to me, most importantly, the light is no good, he said. I always look orange. And so do you. The light is the worst. But No. 2, its many times more expensive than that old incandescent bulb that worked very well. … [+1177 chars]',
        tags: [],
        decisions: [],
        sentiment: null,
      },
      {
        id: '-1466218521',
        author: null,
        source:
          'https://www.cnn.com/videos/politics/2019/09/20/whistleblower-response-partisan-trump-sot-ath-vpx.cnn',
        summary:
          'President Donald Trump called a whistleblower\'s complaint over his communication with a foreign leader a "ridiculous story," and describes the whistleblower, whose identity Trump said he does not know, as partisan. Trump reiterated his conversations with fore…',
        title: 'Trump on anonymous whistleblower: Another political hack job',
        image:
          'https://cdn.cnn.com/cnnnext/dam/assets/190920110914-02-trump-oval-office-0920-super-tease.jpg',
        date: new Date('2019-09-20T15:59:34.000Z'),
        text:
          "Chat with us in Facebook Messenger. Find out what's happening in the world as it unfolds.",
        tags: [],
        decisions: [],
        sentiment: null,
      },
      {
        id: '-325164590',
        author: 'Tim Arango, Thomas Fuller and Jose A. Del Real',
        source:
          'https://www.nytimes.com/2019/09/14/us/california-trump-newsom.html',
        summary:
          'California Democrats have been energized by a wave of anti-Trump sentiment to enact a sweeping liberal agenda that in almost every way offers a counternarrative to Trump administration policies.',
        title: 'Trump Inspires California Lawmakers to Go on Offense',
        image:
          'https://static01.nyt.com/images/2019/09/12/us/12california-01/12california-01-facebookJumbo.jpg',
        date: new Date('2019-09-14T09:52:39.000Z'),
        text:
          'At the Republican Partys recent state convention near Palm Springs, Brad Parscale, Mr. Trumps campaign manager, said, the Trumps will be a dynasty that will last for decades. But the cloud of Mr. Trumps unpopularity in California hung over the convention, and… [+1762 chars]',
        tags: [
          {
            title: 'Republican Party (United States)',
            occurrence: 0.8508925005768544,
          },
          { title: 'Republican Partys', occurrence: 0.7109210858053114 },
          { title: 'Palm Springs, California', occurrence: 0.2517385689338718 },
          {
            title: 'Palm Springs Brad Parscale',
            occurrence: 0.38040418407272525,
          },
          { title: 'Brad Parscale', occurrence: 0.22586477955620277 },
          { title: 'California', occurrence: 0.15664451600170293 },
        ],
        decisions: [{ title: 'Trump Muddies the Air', link: '-1664209724' }],
        sentiment: null,
      },
      {
        id: '-2051071204',
        author: 'David Brooks',
        source:
          'https://www.nytimes.com/2019/09/26/opinion/impeachment-trump-mistake.html',
        summary: 'This political brawl will leave Trump victorious.',
        title: 'Yes, Trump Is Guilty, but Impeachment Is a Mistake',
        image:
          'https://static01.nyt.com/images/2019/09/26/opinion/26brooksWeb/26brooksWeb-facebookJumbo.jpg',
        date: new Date('2019-09-26T23:03:50.000Z'),
        text:
          'The Democrats are having a pretty exciting and substantive presidential primary season. This is what democracy is supposed to look like. Why they would want to distract from that is beyond reason. Trump vs. Nadler is exactly the contrast Trump wants to elevat… [+2121 chars]',
        tags: [
          { title: 'The Democrats (Italy)', occurrence: 0.48776572061912926 },
          { title: 'Why the lucky stiff', occurrence: 0.2894959593462436 },
          { title: 'Donald Trump', occurrence: 0.7174473411448941 },
          { title: 'Trump vs Nadler', occurrence: 0.2732331418741063 },
        ],
        decisions: [
          {
            title:
              'Is It Illegal for a President to Make Money From Outside Businesses While in Office?',
            link: '1949753124',
          },
          {
            title: "The Fight Over California's Emissions Rules Just Got Real",
            link: '-803260838',
          },
          {
            title:
              'With Markers and Straws, Trump’s Campaign Sells Defiance as a Lifestyle',
            link: '-1300675428',
          },
        ],
        sentiment: null,
      },
      {
        id: '-1300675428',
        author: 'Katie Rogers',
        source:
          'https://www.nytimes.com/2019/09/13/us/politics/donald-trump-2020-campaign.html',
        summary:
          'Trump-branded products celebrate the president’s urge to fight back.',
        title:
          'With Markers and Straws, Trump’s Campaign Sells Defiance as a Lifestyle',
        image:
          'https://static01.nyt.com/images/2019/09/11/us/11dc-memo/11dc-memo-facebookJumbo.jpg',
        date: new Date('2019-09-14T17:59:20.000Z'),
        text:
          'Most of the merchandise requests are routed through a company called Ace Specialties in Lafayette, La., whose owner, Christl Mahfouz, can often be seen mingling with fans outside Trump rallies. Her team sells hats in exchange for money and the buyers voting d… [+1856 chars]',
        tags: [
          { title: 'Christl Mahfouz', occurrence: 0.08440088097092158 },
          { title: 'Donald Trump', occurrence: 0.3971990597332171 },
        ],
        decisions: [
          {
            title:
              'Is It Illegal for a President to Make Money From Outside Businesses While in Office?',
            link: '1949753124',
          },
          {
            title: "The Fight Over California's Emissions Rules Just Got Real",
            link: '-803260838',
          },
          {
            title: 'Yes, Trump Is Guilty, but Impeachment Is a Mistake',
            link: '-2051071204',
          },
        ],
        sentiment: null,
      },
      {
        id: '1365726865',
        author: null,
        source:
          'https://www.cnn.com/videos/politics/2019/09/06/trump-sells-magic-marker-on-website-lead-vpx.cnn',
        summary:
          'President Donald Trump has been criticized for doctoring a Hurricane Dorian map projection. The Trump campaign  has since started selling branded markers.',
        title: 'Trump campaign selling markers on site amid backlash',
        image:
          'https://cdn.cnn.com/cnnnext/dam/assets/190906170946-trump-magic-marker-super-tease.jpg',
        date: new Date('2019-09-06T21:13:27.000Z'),
        text:
          "Chat with us in Facebook Messenger. Find out what's happening in the world as it unfolds.",
        tags: [],
        decisions: [],
        sentiment: null,
      },
      {
        id: '-1857209971',
        author: 'The Editorial Board',
        source:
          'https://www.nytimes.com/2019/09/24/opinion/impeachment-inquiry-trump.html',
        summary: 'It’s a start, maybe.',
        title: 'Congress Steps Up, Trump Blinks',
        image:
          'https://static01.nyt.com/images/2019/09/25/opinion/25stakes_alt/25stakes_alt-facebookJumbo.jpg',
        date: new Date('2019-09-25T00:30:12.000Z'),
        text:
          'But over the past couple of months, and more intensely the past couple of weeks, has come an accelerating accretion of more, and more alarming, information: a whistle-blower complaint had been filed with the inspector general of the intelligence community acc… [+2519 chars]',
        tags: [],
        decisions: [],
        sentiment: null,
      },
      {
        id: '-1861130707',
        author: null,
        source:
          'https://www.cnn.com/videos/politics/2019/08/29/cuomo-kayleigh-mcenany-trump-campaign-press-secretary-president-doesnt-lie-cpt-vpx.cnn',
        summary:
          "CNN's Chris Cuomo pressed Trump 2020 Campaign National Press Secretary Kayleigh McEnany when she claimed President Trump has never lied to Americans.",
        title: 'Cuomo to Trump press secretary: He lies and you know it',
        image:
          'https://cdn.cnn.com/cnnnext/dam/assets/190829023304-cuomo-kayleigh-trump-doesnt-lie-split-super-tease.jpg',
        date: new Date('2019-08-29T07:04:04.000Z'),
        text:
          "Chat with us in Facebook Messenger. Find out what's happening in the world as it unfolds.",
        tags: [],
        decisions: [],
        sentiment: null,
      },
      {
        id: '-362251747',
        author: null,
        source:
          'https://www.cnn.com/videos/politics/2019/09/26/pennsylvania-swing-voters-trump-marquez-pkg-newday-vpx.cnn',
        summary:
          "Quakertown, Pennsylvania, voted for President Trump in 2016. CNN's Miguel Marquez talks with locals -- including Trump voters and Democratic voters -- about how they view the president now.",
        title:
          "Trump voter: I think he crossed a line, but that's the way he is",
        image:
          'https://cdn.cnn.com/cnnnext/dam/assets/190926095530-miguel-marquez-talks-with-pennsylvania-voters-super-tease.jpg',
        date: new Date('2019-09-26T14:16:27.000Z'),
        text:
          "Chat with us in Facebook Messenger. Find out what's happening in the world as it unfolds.",
        tags: [],
        decisions: [],
        sentiment: null,
      },
      {
        id: '773189522',
        author: 'Ellie Houghtaling',
        source: 'https://mashable.com/article/chrissy-teigen-trump-comeback/',
        summary:
          "Chrissy Teigen sat down with Ellen DeGeneres to explain her recent Twitter feud with President Donald Trump. If you weren't tuned in at the close of the weekend, Trump lashed out against Teigen and her husband John Legend after Legend appeared in a segment wi…",
        title: "Chrissy Teigen unpacks her viral feud with Trump on 'Ellen'",
        image:
          'https://mondrian.mashable.com/2019%252F09%252F11%252F06%252Ff978ba9e73134a0599b8833c6051848a.14c90.jpg%252F1200x630.jpg?signature=w1NH2Vxkxrnm0bQC_TSYOs3Bx4o=',
        date: new Date('2019-09-11T15:08:10.000Z'),
        text:
          "Chrissy Teigen sat down with Ellen DeGeneres to explain her recent Twitter feud with President Donald Trump.\r\nIf you weren't tuned in at the close of the weekend, Trump lashed out against Teigen and her husband John Legend after Legend appeared in a segment w… [+1363 chars]",
        tags: [
          { title: 'Chrissy Teigen', occurrence: 0.006785445630308473 },
          { title: 'Ellen DeGeneres', occurrence: 0.7546439939797962 },
          { title: 'Twitter', occurrence: 0.09279904854546173 },
          { title: 'Donald', occurrence: 0.13273083746613024 },
          { title: 'Donald Trump', occurrence: 0.43007735541800596 },
          { title: 'John Legend', occurrence: 0.6167750144522377 },
        ],
        decisions: [
          {
            title:
              'Is It Illegal for a President to Make Money From Outside Businesses While in Office?',
            link: '1949753124',
          },
          {
            title:
              'Watch Nancy Pelosi Announce a Formal Impeachment Inquiry into the President',
            link: '-243287060',
          },
          {
            title: "The Fight Over California's Emissions Rules Just Got Real",
            link: '-803260838',
          },
        ],
        sentiment: null,
      },
      {
        id: '-646426251',
        author: 'Brian Heater',
        source:
          'http://techcrunch.com/2019/09/04/trump-not-interested-in-talking-huawei-with-china/',
        summary:
          'During an Oval Office press conference this week, the President told reports that the United States is currently not interesting in broaching the subject of Huawei as part of increasingly heated trade conversations with China. The statement appears to run cou…',
        title: 'Trump not interested in talking Huawei with China',
        image:
          'https://techcrunch.com/wp-content/uploads/2017/02/gettyimages-634145144.jpg?w=600',
        date: new Date('2019-09-04T17:56:01.000Z'),
        text:
          'During an Oval Office press conference this week, the President told reports that the United States is currently not interesting in broaching the subject of Huawei as part of increasingly heated trade conversations with China. The statement appears to run cou… [+1286 chars]',
        tags: [
          { title: 'Oval Office', occurrence: 0.13878688983558196 },
          { title: 'United States', occurrence: 0.20836908146984112 },
          { title: 'Huawei', occurrence: 0.9640298933273219 },
          { title: 'China', occurrence: 0.4792701868210991 },
          { title: 'cou', occurrence: 0.9386066776698556 },
        ],
        decisions: [
          {
            title:
              'International students face immigration hurdles under Trump',
            link: '-1496835350',
          },
        ],
        sentiment: null,
      },
      {
        id: '1499675254',
        author: 'Devin Coldewey',
        source:
          'http://techcrunch.com/2019/09/24/trump-impeachment-could-derail-administrations-maneuvers-in-tech/',
        summary:
          'Speaker of the House Nancy Pelosi announced official impeachment proceedings against President Trump today, and while the approaching political fracas may not be directly tech-related, it could have serious effects on several efforts at the federal level to r…',
        title:
          'Trump impeachment could derail administration’s maneuvers in tech',
        image:
          'https://techcrunch.com/wp-content/uploads/2017/03/gettyimages-654558608.jpg?w=600',
        date: new Date('2019-09-24T22:47:34.000Z'),
        text:
          'Speaker of the House Nancy Pelosi announced official impeachment proceedings against President Trump today, and while the approaching political fracas may not be directly tech-related, it could have serious effects on several efforts at the federal level to r… [+3403 chars]',
        tags: [
          { title: 'House Nancy Pelosi', occurrence: 0.756727134462255 },
          { title: 'Nancy Pelosi', occurrence: 0.2659191442126476 },
          { title: 'Donald Trump', occurrence: 0.5425980162334456 },
          { title: 'Trump', occurrence: 0.59903148919458 },
        ],
        decisions: [
          {
            title:
              'Is It Illegal for a President to Make Money From Outside Businesses While in Office?',
            link: '1949753124',
          },
          {
            title:
              'Watch Nancy Pelosi Announce a Formal Impeachment Inquiry into the President',
            link: '-243287060',
          },
          {
            title: "The Fight Over California's Emissions Rules Just Got Real",
            link: '-803260838',
          },
        ],
        sentiment: null,
      },
    ];
  }
}
