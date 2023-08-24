import { APIGatewayProxyEvent } from 'aws-lambda';
import { CustomersService } from '../service/CustomersService';
import { Customer } from '../domain/Customer';
import { apiBadRequestError, apiOk } from '../helpers';

export class CustomersController {
  constructor(private service: CustomersService) {}

  async findByFilter(event: APIGatewayProxyEvent) {
    if (!event.queryStringParameters?.name) {
      return apiBadRequestError();
    }
    const { name, lastName, phoneNumber } = event.queryStringParameters;

    return apiOk(
      await this.service.findByFilter(
        new Customer({
          ...(name && { name }),
          ...(lastName && { lastName }),
          ...(phoneNumber && { phoneNumber }),
        })
      )
    );
  }
}
