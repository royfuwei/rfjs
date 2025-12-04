import { RouteOptions } from 'fastify';
import { getAppHandler, getDemoDataHandler, testAppError } from './handlers';

const appRoute: RouteOptions = {
  method: 'GET',
  url: '/app',
  schema: {
    tags: ['app'],
  },
  handler: getAppHandler,
};

const testAppErrorRoute: RouteOptions = {
  method: 'GET',
  url: '/app/error',
  schema: {
    tags: ['app'],
  },
  handler: testAppError,
};

const getDemoDataRoute: RouteOptions = {
  method: 'GET',
  url: '/app/demo',
  schema: {
    tags: ['app'],
  },
  handler: getDemoDataHandler,
};

export const appRoutes: RouteOptions[] = [appRoute, testAppErrorRoute, getDemoDataRoute];
