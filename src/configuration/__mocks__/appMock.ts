import { Express, Request, RequestHandler, Response } from 'express';

/** Test controller response */
export type TestControllerResponse = Readonly<{ path: string }>;
/** Test controller */
export type TestController = (...args: unknown[]) => TestControllerResponse;

/** The type of the parameters for rendering data on a response */
export type RenderDataModel = Readonly<{
  pathWithoutLeadingSlash: string,
  data: TestControllerResponse
}>;

/**
 * The type of the parameters for rendering data on a response on an app
 */
export type AppDataModel = Readonly<{
  path: string,
  data: RenderDataModel
}>;

/** The mock response and getters for its methods */
export type MockResponseGetters = Readonly<{
  response: Response,
  getRenderedData: () => readonly RenderDataModel[]
}>;

/** The mock app, response, and getters for its methods/properties */
export type MockAppGetters = Readonly<{
  mockApp: Express,
  getPaths: () => readonly string[],
  response: MockResponseGetters
}>;

/**
 * Creates a mock app
 * @returns A mock app with methods to get data from the app
 */
export const createMockApp = (): MockAppGetters => {
  const mockResponse = createResponseMock();
  let paths: string[] = [];
  const mockApp = {
    get: createMock<RequestHandler>((path: string, reqHandler: RequestHandler) => {
      paths.push(path);
      reqHandler({} as Request, mockResponse.response, () => {});
    })
  } as unknown as Express;

  return {
    mockApp,
    getPaths: () => paths,
    response: mockResponse
  };
};

/**
 * Creates a mock response
 * @returns A mock response with methods to get data from the response
 */
export const createResponseMock = (): MockResponseGetters => {
  let renderData: RenderDataModel[] = [];
  const mockResponse = {
    render: createMock<RequestHandler>((
      pathWithoutLeadingSlash: string,
      data: TestControllerResponse
    ) => renderData.push({ pathWithoutLeadingSlash, data }))
  } as unknown as Response;

  return {
    response: mockResponse,
    getRenderedData: () => renderData
  };
};

/**
 * Create a mock of the given type
 * @param implementation The implementation of the mock
 * @returns A mock of the given type
 */
export const createMock = <T>(implementation: (...args: any[]) => void): T => {
  return jest.fn().mockImplementation(implementation) as unknown as T;
};