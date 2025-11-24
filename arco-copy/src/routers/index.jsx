import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import LoadingComponent from '@/compontents/Loading';
import RequireAuth from '@/compontents/Auth';
import EmptyLayout from '@/layout/emptyLayout';

const load = (children) => <Suspense fallback={<LoadingComponent />}>{children}</Suspense>;
const Login = lazy(() => import('@/views/login'));
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
  }
];
const RenderRouter = () => {
  const element = useRoutes(routeList);
  return element;
};
export const localRouters = routeList;
export default RenderRouter;
