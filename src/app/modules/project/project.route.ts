import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { ProjectControllers } from './project.controller';
import { ProjectValidations } from './project.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(ProjectValidations.createProjectValidaitonSchema),
  ProjectControllers.createProject,
);

router.get('/', auth(USER_ROLE.admin), ProjectControllers.getAllProjects);

router.get('/:id', ProjectControllers.getProjectById);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(ProjectValidations.updateProjectValidaitonSchema),
  ProjectControllers.updateProjectById,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  ProjectControllers.deleteProjectById,
);

export const ProjectRouters = router;
