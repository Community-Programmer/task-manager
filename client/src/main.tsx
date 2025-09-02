import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import RootLayout from './components/root-layout';


createRoot(document.getElementById('root')!).render(
  <RootLayout>
    <RouterProvider router={router} />
  </RootLayout>
);
