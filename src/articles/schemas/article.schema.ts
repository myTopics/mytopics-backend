import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
    title: String,
    summary: String,
    image: String,
    text: String,
    tags: Array, // TODO not in schema? Or in schema?
});
