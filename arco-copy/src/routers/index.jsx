import { IconDashboard, IconCodeSquare, IconBug, IconMenu } from '@arco-design/web-react/icon';
import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import LoadingComponent from '@/compontents/Loading';
import RequireAuth from '@/compontents/Auth';
import EmptyLayout from '@/layout/emptyLayout';
import LayoutPage from '@/layout';

const load = (children) => <Suspense fallback={<LoadingComponent />}>{children}</Suspense>;
const Login = lazy(() => import('@/views/login'));
const Workplace = lazy(() => import('@/views/dashboard/workplace'));

const requirePublicLayout = () => (
  <RequireAuth>
    <LayoutPage />
  </RequireAuth>
);

const requireEmptyLayout = () => (
  <RequireAuth>
    <EmptyLayout />
  </RequireAuth>
);
const routeList = [
  {
    path: '/',
    element: requireEmptyLayout(),
    children: [
      {
        index: true,
        key: 'login',
        element: load(<Login />),
        meta: {
          title: '登录'
        }
      }
    ]
  },
  {
    path: '/dashboard',
    key: '/dashboard',
    element: requirePublicLayout(),
    meta: {
      name: 'menu.dashboard',
      title: '仪表盘',
      icon: <IconDashboard />
    },
    children: [
      {
        path: 'workplace',
        key: '/dashboard/workplace',
        element: load(<Workplace />),
        meta: {
          name: 'menu.dashboard.workplace',
          title: '工作台'
        }
      }
    ]
  }
];
const RenderRouter = () => {
  const element = useRoutes(routeList);
  return element;
};
export const localRouters = routeList;
export default RenderRouter;
