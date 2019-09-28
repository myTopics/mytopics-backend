import { IsString, IsArray } from 'class-validator';

export class GetArticleSummarizedDto {
    @IsString()
    readonly title: string;
    @IsString()
    readonly summary: string;
    @IsString()
    readonly image: string;
    @IsArray()
    readonly tags: string[];
}
