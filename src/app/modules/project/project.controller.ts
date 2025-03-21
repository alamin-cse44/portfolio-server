import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './project.service';

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlogIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog is created successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blogs are retrieved successfully',
    data: result,
  });
});

const getBlogById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.getBlogByIdFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog is retrieved successfully',
    data: result,
  });
});

const updateBlogById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.updateBlogByIdIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog is updated successfully',
    data: result,
  });
});

const deleteBlogById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.deleteBlogByIdFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog is deleted successfully',
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
};
