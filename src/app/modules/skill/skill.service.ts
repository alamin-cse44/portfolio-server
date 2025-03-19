import { StatusCodes } from 'http-status-codes';
import QeryBuilder from '../../builder/QeryBuilder';
import AppError from '../../errors/AppError';
import { ISkill } from './skill.interface';
import { Skill } from './skill.model';
import { skillSearchableFields } from './skill.constant';

const createSkillIntoDB = async (payload: ISkill) => {
  const result = await Skill.create(payload);

  return result;
};

const getAllSkillsFromDB = async (query: Record<string, unknown>) => {
  const skillQuery = new QeryBuilder(Skill.find(), query)
    .search(skillSearchableFields)
    .filter()
    .sort()
    .sortByAscOrDesc()
    .paginate()
    .fields();

  const result = await skillQuery.modelQuery;

  return result;
};

const getSkillByIdFromDB = async (id: string) => {
  // check if skill exists by id
  const skill = await Skill.isSkillExistById(id);

  if (!skill) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Skill not found');
  }
  const result = await Skill.findById(id);

  return result;
};

const updateSkillByIdIntoDB = async (id: string, payload: Partial<ISkill>) => {
  // check if skill exists by id
  const skill = await Skill.isSkillExistById(id);

  if (!skill) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Skill not found');
  }

  // update the skill
  const result = await Skill.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSkillByIdFromDB = async (id: string) => {
  // check if skill exists by id
  const skill = await Skill.isSkillExistById(id);

  if (!skill) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Skill not found');
  }

  // delete the skill
  const result = await Skill.findByIdAndDelete(id);

  return result;
};

export const SkillServices = {
  createSkillIntoDB,
  getAllSkillsFromDB,
  getSkillByIdFromDB,
  updateSkillByIdIntoDB,
  deleteSkillByIdFromDB,
};
