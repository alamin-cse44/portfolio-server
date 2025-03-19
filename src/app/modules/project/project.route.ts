import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { ListingValidations } from './project.validation';
import { ProjectControllers } from './project.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(ListingValidations.createListingValidaitonSchema),
  ProjectControllers.createProject,
);

router.get('/', auth(USER_ROLE.admin), ProjectControllers.getAllProjects);

router.get('/:id', ProjectControllers.getProjectById);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(ListingValidations.updateListingValidaitonSchema),
  ProjectControllers.updateProjectById,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  ProjectControllers.deleteProjectById,
);

export const ProjectRouters = router;
