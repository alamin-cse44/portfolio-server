import { model, Schema } from 'mongoose';
import { ISkill, SkillModel } from './skill.interface';

const skillSchema = new Schema<ISkill, SkillModel>(
  {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// check the user with the id
skillSchema.statics.isSkillExistById = async function (id: string) {
  return await Skill.findById(id);
};

export const Skill = model<ISkill, SkillModel>('Skill', skillSchema);
