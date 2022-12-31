import { useViewControllers } from '../middleware';
import { createMockApp, RenderDataModel, TestController } from '../__mocks__/appMock';

describe('test useViewControllers', () => {
  type TestRoutePathInput = Readonly<{
    description: string,
    routes: Record<string, TestController>,
    expectedRenderedRoute: Record<string, RenderDataModel>
  }>;
  const testRoutePathInputs: TestRoutePathInput[] = [{
    description: 'should route index path correctly',
    routes: {
      '/': (_) => ({ path: '/' })
    },
    expectedRenderedRoute: {
      '/': { pathWithoutLeadingSlash: '', data: { path: '/' } }
    }
  }, {
    description: 'should route multiple paths correctly',
    routes: {
      '/testRoute1': (_) => ({ path: '/testRoute1' }),
      '/testRoute2': (_) => ({ path: '/testRoute2' })
    },
    expectedRenderedRoute: {
      '/testRoute1': { pathWithoutLeadingSlash: 'testRoute1', data: { path: '/testRoute1' } },
      '/testRoute2': { pathWithoutLeadingSlash: 'testRoute2', data: { path: '/testRoute2' } }
    }
  }, {
    description: 'should use the same path for rendering if the path does not have a leading slash',
    routes: {
      'testRoute': (_) => ({ path: 'testRoute' })
    },
    expectedRenderedRoute: {
      'testRoute': { pathWithoutLeadingSlash: 'testRoute', data: { path: 'testRoute' } }
    }
  }];

  it.each`
    description                           | routes                           | expectedRenderedRoute
    ${testRoutePathInputs[0].description} | ${testRoutePathInputs[0].routes} | ${testRoutePathInputs[0].expectedRenderedRoute}
    ${testRoutePathInputs[1].description} | ${testRoutePathInputs[1].routes} | ${testRoutePathInputs[1].expectedRenderedRoute}
    ${testRoutePathInputs[2].description} | ${testRoutePathInputs[2].routes} | ${testRoutePathInputs[2].expectedRenderedRoute}
  `('useViewControllers $description', ({ routes, expectedRenderedRoute }: TestRoutePathInput) => {
    const expectedTestRoutesLength = Object.keys(expectedRenderedRoute).length;
    const {
      mockApp,
      getPaths,
      response: { getRenderedData }
    } = createMockApp();
    useViewControllers(mockApp, routes);

    const paths = getPaths();
    const renderedData = getRenderedData();
    expect(paths.length).toBe(expectedTestRoutesLength);
    expect(renderedData.length).toBe(expectedTestRoutesLength);
    renderedData
      .map(route => ({ ...route, path: route.data.path }))
      .forEach(({ path, data, pathWithoutLeadingSlash }) => {
        const expectedRoute = expectedRenderedRoute[path];
        expect(expectedRoute).toBeDefined();
        expect(data).toEqual(expectedRoute.data);
        expect(pathWithoutLeadingSlash).toEqual(expectedRoute.pathWithoutLeadingSlash);
      });
  });
});