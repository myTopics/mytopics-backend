import { IsString, IsArray } from 'class-validator';

export class Article {
    @IsString()
    readonly title: string;
    @IsString()
    readonly summary: string;
    @IsString()
    readonly image: string;
    @IsString()
    readonly text: string;
    @IsArray()
    readonly tags: string[];
}
