import { Decision } from './decision.interface';
import { Tag } from './tag.interface';

export interface Article {
  readonly id: string;
  readonly title: string;
  readonly source: string;
  readonly author: string;
  readonly summary: string;
  readonly text: string;
  readonly tags: Tag[]; // null, generated
  readonly image: string; // nullable => generated
  readonly decisions: Decision[]; // at least one
  readonly date: Date; // nullable
  readonly sentiment: number; // null, filled by TagService..
}
