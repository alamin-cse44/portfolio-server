import { StatusCodes } from 'http-status-codes';
import QeryBuilder from '../../builder/QeryBuilder';
import AppError from '../../errors/AppError';
import { Project } from './project.model';
import { IBlog } from '../blog/blog.interface';
import { Blog } from '../blog/blog.model';
import { blogSearchableFields } from '../blog/blog.constant';

const createBlogIntoDB = async (payload: IBlog) => {
  const result = await Blog.create(payload);

  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  
  const blogQuery = new QeryBuilder(Project.find(), query)
    .search(blogSearchableFields)
    .filter()
    .sort()
    .sortByAscOrDesc()
    .paginate()
    .fields();

  const result = await blogQuery.modelQuery;

  return result;
};

const getBlogByIdFromDB = async (id: string) => {
  // check if Blog exists by id
  const blog = await Blog.isBlogExistById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  const result = await Blog.findById(id);

  return result;
};

const updateBlogByIdIntoDB = async (
  id: string,
  payload: Partial<IBlog>,
) => {
  // check if Blog exists by id
  const blog = await Blog.isBlogExistById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  // update the Blog
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteBlogByIdFromDB = async (id: string) => {
  // check if Blog exists by id
  const blog = await Blog.isBlogExistById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  // delete the Blog
  const result = await Blog.findByIdAndDelete(id);

  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getBlogByIdFromDB,
  updateBlogByIdIntoDB,
  deleteBlogByIdFromDB,
};
