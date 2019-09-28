import { Decision } from '../../decisions/interfaces/decision.interface';

export interface Article {
    readonly id: string;
    readonly title: string;
    readonly source: string;
    readonly summary: string;
    readonly text: string;
    readonly tags: Map<string, number>; // null, generated
    readonly image: string; // nullable => generated
    readonly decisions: Decision[];
    readonly date: Date;
    // readonly sentiment: number;
}
