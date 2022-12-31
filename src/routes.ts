import type { Request } from "express";
import AboutController from "./controllers/aboutController";
import HomeController from "./controllers/homeController";

/**
 * A view controller
 */
export type Controller = (req: Request) => Record<string, unknown>;
/**
 * A record of routes to their controllers
 */
export type Routes = Readonly<Record<string, Controller>>;

/**
 * The mapped routes to their controllers
 * Views are implicitly rendered for each controller based on the path (e.x. /home => src/views/home.ejs)
 */
export const routes: Routes = {
  '/': HomeController,
  '/about': AboutController
};