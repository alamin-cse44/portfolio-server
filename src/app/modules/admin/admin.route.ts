import express from 'express';
import { AdminControllers } from './admin.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.patch(
  '/users/:id',
  auth('admin'),
  // validateRequest(AdminValidations.updateUserRoleValidationSchema),
  AdminControllers.updateRole,
);

router.delete('/user/:id', auth('admin'), AdminControllers.blockSignleUserById);

router.get('/users', auth('admin'), AdminControllers.getAllUsers);

export const AdminRouters = router;
