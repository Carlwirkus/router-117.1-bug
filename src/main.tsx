import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRouter, createRoute,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import './styles.css';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const rootRoute = createRootRoute({
  component: () => <>
    <Outlet />
    <TanStackRouterDevtools />
  </>,
});

const indexRoute = createRoute({
  component: () => (
      <div className="bg-green-500 h-screen">
        loaded...
      </div>
  ),
  path: "/",
  getParentRoute: () => rootRoute,
  loader: async () => {
    await sleep(2000);
  },
})

const routeTree = rootRoute.addChildren([indexRoute]);

const router = createRouter({
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('app')!;
const root = ReactDOM.createRoot(rootElement);


root.render(
  <StrictMode>
    <div className="bg-red-500 h-screen">
      <RouterProvider router={router} defaultPendingMs={0} defaultPendingComponent={() => <div className="bg-green-500 h-screen">loading..</div>}  />
    </div>
  </StrictMode>
);
