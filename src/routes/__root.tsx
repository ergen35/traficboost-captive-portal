import { Outlet, createRootRoute, HeadContent } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export const Route = createRootRoute({
    component: () => (
        <>
            <HeadContent />
            <Outlet />
            <ToastContainer />
            <TanStackRouterDevtools />
        </>
    ),
})
