import express from 'express';
import {
  setViewEngine,
  useRequestMiddleware,
  useRoutes,
  useViewControllers,
  useStaticFiles
} from "./configuration/middleware";
import { EjsViewEngine, getAppSettings, getPathFactory } from './configuration/settings';
import { routes } from './routes';

const path = getPathFactory(process.cwd());
const appSettings = getAppSettings();
const app = express();

useRequestMiddleware(app);

useStaticFiles(app, path(appSettings.staticResourcesPath));

useRoutes(app);

setViewEngine(app, EjsViewEngine, path(appSettings.viewsRootPath));
useViewControllers(app, routes);

const port = process.env.PORT || appSettings.port;
app.listen(port, () => console.log(`Listening on port ${port}`));