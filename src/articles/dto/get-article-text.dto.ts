import { IsString, IsArray } from 'class-validator';

export class GetArticleTextDto {
    @IsString()
    readonly id: string;
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
