import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { SkillControllers } from './skill.controller';
import { SkillValidations } from './skill.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(SkillValidations.createSkillValidaitonSchema),
  SkillControllers.createSkill,
);

router.get('/', SkillControllers.getAllSkills);

router.get('/:id', SkillControllers.getSkillById);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(SkillValidations.updateSkillValidaitonSchema),
  SkillControllers.updateSkillById,
);

router.delete('/:id', auth(USER_ROLE.admin), SkillControllers.deleteSkillById);

export const SkillRouters = router;
