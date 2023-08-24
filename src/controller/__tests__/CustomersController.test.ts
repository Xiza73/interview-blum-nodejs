import { APIGatewayProxyEvent } from 'aws-lambda';
import { CustomersController } from '../CustomersController';
import { CustomersService } from '../../service/CustomersService';

describe('CustomersController', () => {
  describe('findByFilter', () => {
    it('should return customers', async () => {
      // Prepare
      const service = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
              phoneNumber: 'phoneNumber',
              email: 'email',
            },
          ])
        ),
      } as unknown as CustomersService;

      const controller = new CustomersController(service);

      // Execute
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {
          name: 'A',
        },
      } as unknown as APIGatewayProxyEvent);

      // Validate
      expect(response).toEqual({
        statusCode: 200,
        isBase64Encoded: false,
        body: '[{"id":"customerId","name":"name","lastName":"lastName","phoneNumber":"phoneNumber","email":"email"}]',
      });
      expect(service.findByFilter).toBeCalledWith({
        name: 'A',
      });
    });
  });
});
