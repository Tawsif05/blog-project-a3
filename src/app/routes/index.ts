import { Router } from 'express';
import authRouter from '../modules/Auth/auth.route';
import blogRouter from '../modules/Blog/blog.route';
import adminRouter from '../modules/Admin/admin.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/blogs',
    route: blogRouter,
  },
  {
    path: '/admin',
    route: adminRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
