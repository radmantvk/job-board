import type { Request } from "express";
import { GetPath } from "./configuration/settings";

/**
 * A view controller
 */
export type Controller = (req: Request) => Record<string, unknown>;
/**
 * A record of routes to their controllers
 */
export type Routes = Readonly<Record<string, Controller>>;

/**
 * The mapped routes to their controllers (views are implicitly rendered for each controller)
 */
const routes: Routes = {};

/**
 * Provides the routes
 * @param getPath A function to resolve a path
 * @returns The routes
 */
const routesProvider = (getPath: GetPath): Routes => Object
  .entries(routes)
  .reduce((routes, [p, controller]) => ({ ...routes, [p]: controller }), {});
export default routesProvider;