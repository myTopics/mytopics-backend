export interface Article {
    readonly title: string;
    readonly summary: string;
    readonly image: string;
    readonly text: string;
    readonly tags: string[]; // TODO not in schema? Or in schema?
}
