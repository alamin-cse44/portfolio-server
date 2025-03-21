import { Document, Model, Types } from 'mongoose';

export interface IBlog {
  title: string;
  content: string;
  image: string;
}

export type BlogDocument = IBlog & Document;

export interface BlogModel extends Model<IBlog> {
  isBlogExistById(id: string): Promise<IBlog>;
}
