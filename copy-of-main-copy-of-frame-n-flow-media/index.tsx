import { ViteSSG } from 'vite-react-ssg';
import App from './App';
import { routes } from './routes';
import './index.css';

export const createApp = ViteSSG(
  App,
  { routes }
);