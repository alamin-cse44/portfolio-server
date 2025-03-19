import { Document, Model } from 'mongoose';

export interface ISkill {
  title: string;
  icon: string;
}

export type SkillDocument = ISkill & Document;

export interface SkillModel extends Model<ISkill> {
  isSkillExistById(id: string): Promise<ISkill>;
}
