import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import '~/globals.css';
import '~/amplify.config';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async';

import { NotFound } from '~/components/layout';
import {
  Account,
  AddProperty,
  CreateReport,
  EditProperty,
  EditReport,
  Login,
  MessageDetails,
  PageDetails,
  Properties,
  ReportDetails,
  Reports,
  Root,
  Scans,
  Signup,
  TagDetails,
} from '~/routes';
import { addPropertyAction } from '~/routes/protected/properties/add-property';
import {
  propertyLoader,
  updatePropertyAction,
} from '~/routes/protected/properties/edit-property';
import { propertiesLoader } from '~/routes/protected/properties/properties';
import { createReportAction } from './routes/protected/reports/create-report';
import { reportDetailsLoader } from './routes/protected/reports/report-details';
import { reportsLoader } from './routes/protected/reports/reports';
import { scansLoader } from './routes/protected/scans';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Navigate to="/reports" replace /> },
      {
        path: 'reports',
        element: <Reports />,
        loader: reportsLoader(queryClient),
      },
      {
        path: 'reports/create',
        element: <CreateReport />,
        action: createReportAction(queryClient),
      },
      {
        path: 'reports/:reportId',
        element: <ReportDetails />,
        loader: reportDetailsLoader(queryClient),
      },
      { path: 'reports/:reportId/edit', element: <EditReport /> },
      {
        path: 'reports/:reportId/messages/:messageId',
        element: <MessageDetails />,
      },
      { path: 'reports/:reportId/tags/:tagId', element: <TagDetails /> },
      { path: 'reports/:reportId/pages/:pageId', element: <PageDetails /> },
      { path: 'account', element: <Account /> },
      { path: 'scans', element: <Scans />, loader: scansLoader(queryClient) },
      {
        path: 'properties',
        element: <Properties />,
        loader: propertiesLoader(queryClient),
      },
      {
        path: 'properties/add',
        element: <AddProperty />,
        action: addPropertyAction(queryClient),
      },
      {
        path: 'properties/:propertyId/edit',
        element: <EditProperty />,
        loader: propertyLoader(queryClient),
        action: updatePropertyAction(queryClient),
      },
    ],
  },
  { path: '/login', element: <Login />, errorElement: <NotFound /> },
  { path: '/signup', element: <Signup />, errorElement: <NotFound /> },
]);

const domNode = document.getElementById('root')!;
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);
