import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <ToastContainer />
      <TanStackRouterDevtools />
    </>
  ),
})
