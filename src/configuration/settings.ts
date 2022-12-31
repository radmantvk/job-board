import path from 'path';
import AppSettingsJson from '../appsettings.json';

/**
 * The type of the app settings
 */
export type AppSettings = {
  port: number,
  staticResourcesPath: string,
  viewEngine: string,
  viewsRootPath: string
};

/**
 * Get the app settings
 * @returns The app settings
 */
export const getAppSettings = (): AppSettings => AppSettingsJson;

/**
 * The type of a function that gets a path
 */
export type GetPath = (p: string) => string;
/**
 * Factory for getting paths relative to the given working directory
 * @param workingDir The working directory
 * @returns A function that will get a path
 */
export const getPathFactory = (workingDir: string): GetPath => (p: string) => path.join(workingDir, p);

/**
 * The EJS view engine name
 */
export const EjsViewEngine = 'ejs' as const;
/**
 * Express View setting
 */
export const Views = 'views' as const;
/**
 * Express View Engine setting
 */
export const ViewEngine = 'view engine' as const;