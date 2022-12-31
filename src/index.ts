import express from 'express';
import {
  useViewEngine,
  useRequestMiddleware,
  useRoutes,
  useViewControllers,
  useStaticFiles
} from "./configuration/middleware";
import { EjsViewEngine, getAppSettings, getPathFactory } from './configuration/settings';
import routesProvider from './routes';

const path = getPathFactory(process.cwd());
const appSettings = getAppSettings();
const app = express();
const routes = routesProvider(path);

useRequestMiddleware(app);

useStaticFiles(app, path(appSettings.staticResourcesPath));

useRoutes(app);

useViewEngine(app, EjsViewEngine, path(appSettings.viewsRootPath));
useViewControllers(app, routes);

const port = process.env.PORT || appSettings.port;
app.listen(port, () => console.log(`Listening on port ${port}`));