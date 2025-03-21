import { Router } from 'express';
import { UserRouters } from '../modules/user/user.route';
import { AdminRouters } from '../modules/admin/admin.route';
import { AuthRouters } from '../modules/auth/auth.route';
import { ProjectRouters } from '../modules/project/project.route';
import { SkillRouters } from '../modules/skill/skill.route';
import { BlogRouters } from '../modules/blog/blog.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouters,
  },
  {
    path: '/auth',
    route: AuthRouters,
  },
  {
    path: '/admin',
    route: AdminRouters,
  },
  {
    path: '/projects',
    route: ProjectRouters,
  },
  {
    path: '/skills',
    route: SkillRouters,
  },
  {
    path: '/blogs',
    route: BlogRouters,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
