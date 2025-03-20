import { Document, Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export interface IProject {
  title: string;
  user: Types.ObjectId | IUser;
  briefDescription: string;
  service: string;
  status: string;
  live: string;
  description: string;
  images: { url: string }[];
  technologies: { value: string }[];
}

export type ProjectDocument = IProject & Document;

export interface ProjectModel extends Model<IProject> {
  isProjectExistById(id: string): Promise<IProject>;
}
