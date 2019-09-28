import { IsString } from 'class-validator';

export class Article {
    @IsString()
    readonly title: string;
    @IsString()
    readonly summary: string;
    @IsString()
    readonly image: string;
    @IsString()
    readonly text: string;
}
