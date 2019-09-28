export interface Article {
    readonly title: string;
    readonly summary: string;
    readonly image: string;
    readonly text: string;
    readonly tags: Map<string, number>;
}
