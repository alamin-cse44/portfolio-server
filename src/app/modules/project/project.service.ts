import { StatusCodes } from 'http-status-codes';
import QeryBuilder from '../../builder/QeryBuilder';
import AppError from '../../errors/AppError';
import { projectSearchableFields } from './project.constant';
import { IProject } from './project.interface';
import { Project } from './project.model';

const createProjectIntoDB = async (payload: IProject) => {
  const result = await Project.create(payload);

  return result;
};

const getAllProjectsFromDB = async (query: Record<string, unknown>) => {
  // TODO: Populate
  const projectQuery = new QeryBuilder(Project.find().populate('user'), query)
    .search(projectSearchableFields)
    .filter()
    .sort()
    .sortByAscOrDesc()
    .paginate()
    .fields();

  const result = await projectQuery.modelQuery;

  return result;
};

const getProjectByIdFromDB = async (id: string) => {
  // check if project exists by id
  const project = await Project.isProjectExistById(id);

  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found');
  }
  const result = await Project.findById(id).populate('user');

  return result;
};

const updateProjectByIdIntoDB = async (
  id: string,
  payload: Partial<IProject>,
) => {
  // check if project exists by id
  const project = await Project.isProjectExistById(id);

  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found');
  }

  // update the project
  const result = await Project.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteProjectByIdFromDB = async (id: string) => {
  // check if project exists by id
  const project = await Project.isProjectExistById(id);

  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found');
  }

  // delete the project
  const result = await Project.findByIdAndDelete(id);

  return result;
};

export const ProjectServices = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  getProjectByIdFromDB,
  updateProjectByIdIntoDB,
  deleteProjectByIdFromDB,
};
