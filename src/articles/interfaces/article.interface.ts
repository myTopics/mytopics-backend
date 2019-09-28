export interface Article {
    readonly title: string;
    readonly summary: string;
    readonly image: string;
    readonly text: string;
    /** Optional ? */
    readonly author: string;
    readonly source: string; // full url or only publication
    readonly postedAt: Date;
    readonly modifiedAt: Date;
}
