import { Decision } from './decision.interface';
import { Tag } from './tag.interface';

export interface Article {
  id: string;
  title: string;
  source: string;
  author: string;
  summary: string;
  text: string;
  tags?: Tag[]; // null, generated
  image?: string; // nullable
  imageDescription?: string; // nullable, generated
  decisions: Decision[]; // at least one
  date?: Date; // nullable
  sentiment?: number; // null, filled by TagService..
}
