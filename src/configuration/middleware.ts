import express, { Express, Router } from 'express';
import { ViewEngine, Views } from './settings';
import { Routes } from '../routes';

/**
 * Register request middleware
 * @param app The app to register the middleware on
 */
export const useRequestMiddleware = (app: Express): Express => app
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

/**
 * Use a view template engine
 * @param app The app to register the template engine on
 * @param viewsPath The path to the views directory
 */
export const useViewEngine = (app: Express, viewEngine: string, viewsPath: string): Express => app
  .set(Views, viewsPath)
  .set(ViewEngine, viewEngine);

/**
 * Register static files
 * @param app The app to register the static files on
 * @param staticResourcePath The path to the static resources
 */
export const useStaticFiles = (app: Express, staticResourcePath: string): Express => app
  .use(express.static(staticResourcePath));

/**
 * Register view routes and associated controllers on the app
 * @param app The app to register the views and controllers on
 */
export const useViewControllers = (app: Express, routes: Routes): Express => {
  Object
    .entries(routes)
    .reverse()
    .forEach(([path, handler]) => {
      const withoutLeadingSlash = path.replace(/^\//, '');
      app.get(path, (req, res) => res.render(withoutLeadingSlash, handler(req)));
    });
  return app;
}

/**
 * A path and associated router pair
 */
export type RoutePathPair = readonly [string, Router];
/**
 * Registers routes on an app
 * @param app The app to register the routes on
 * @param routes The routes to register
 */
export const useRoutes = (app: Express, ...routes: RoutePathPair[]): Express => {
  routes.forEach(([path, router]) => app.use(path, router));
  return app;
}