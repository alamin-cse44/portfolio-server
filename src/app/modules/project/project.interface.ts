import { Document, Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export interface IProject {
  title: string;
  user: Types.ObjectId | IUser;
  description: string;
  images: { url: string }[];
  technologies: { name: string }[];
}

export type ProjectDocument = IProject & Document;

export interface ProjectModel extends Model<IProject> {
  isProjectExistById(id: string): Promise<IProject>;
}
