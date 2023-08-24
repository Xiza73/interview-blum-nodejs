import 'source-map-support/register';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { controller } from '../controller';
import { apiBadRequestError } from '../helpers';

const RoutesHandler = {
  GET: {
    '/customers': controller.findByFilter,
  },
} as const;
type Method = keyof typeof RoutesHandler;
type Route = keyof (typeof RoutesHandler)[Method];

export const customersHandler = async (event: APIGatewayProxyEvent) => {
  const handler =
    RoutesHandler[event.httpMethod as Method]?.[event.resource as Route];

  if (!handler) return apiBadRequestError();

  return handler(event);
};
