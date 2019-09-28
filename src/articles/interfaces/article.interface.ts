import { Decision } from './decision.interface';
import { Tag } from './tag.interface';

export interface Article {
  readonly id: string;
  readonly title: string;
  readonly source: string;
  readonly summary: string;
  readonly text: string;
  readonly tags: Tag[]; // null, generated
  readonly image: string; // nullable => generated
  readonly decisions: Decision[];
  readonly date: Date;
  // readonly sentiment: number;
}
