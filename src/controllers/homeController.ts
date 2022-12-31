import { Controller } from "../routes";

/**
 * The home controller
 * @param req
 * @returns The home view model
 */
const homeController: Controller = (_) => {
  return { titleMessage: "Express App With EJS" };
};

export default homeController;