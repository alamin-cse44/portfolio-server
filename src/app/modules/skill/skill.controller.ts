import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SkillServices } from './skill.service';

const createSkill = catchAsync(async (req, res) => {
  const result = await SkillServices.createSkillIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Skill is created successfully',
    data: result,
  });
});

const getAllSkills = catchAsync(async (req, res) => {
  
  const result = await SkillServices.getAllSkillsFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Skills are retrieved successfully',
    data: result,
  });
});

const getSkillById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SkillServices.getSkillByIdFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Skill is retrieved successfully',
    data: result,
  });
});

const updateSkillById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SkillServices.updateSkillByIdIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Skill is updated successfully',
    data: result,
  });
});

const deleteSkillById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SkillServices.deleteSkillByIdFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Skill is deleted successfully',
    data: result,
  });
});

export const SkillControllers = {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkillById,
  deleteSkillById,
};
