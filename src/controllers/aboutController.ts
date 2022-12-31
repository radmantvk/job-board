import { Controller } from "../routes";

/**
 * The about controller
 * @param req
 * @returns The about view model
 */
const aboutController: Controller = (_) => {
  return { myParam: 10 };
}
export default aboutController;