# Improvements for the project

Mainly the improvements are related to the scalability of the project and some optimizations.

- Change type `RandomUser` to interface and export from interfaces folder

```ts
export interface RandomUser
```

- Implement axios instance to avoid repeating the same configuration in every request

```ts
import axios from 'axios';

const createCustomerInstance = () =>
  axios.create({
    baseURL: 'https://randomuser.me/api/',
    timeout: 1000,
  });

export const CustomerClient = createCustomerInstance();
```

- Create impl folder to separate the implementation from the interfaces `impl/CustomerRepositoryImpl.ts`

- Add barrel files to export many files from the same folder `impl/index.ts`

```ts
import { CustomersServiceImpl } from './impl';
```

- Implement more filter parameters to the Random User API

`CustomerController.ts`

```ts
const { name, lastName, phoneNumber } = event.queryStringParameters;

return this.apiResponseOk(
  await this.service.findByFilter(
    new Customer({
      ...(name && { name }),
      ...(lastName && { lastName }),
      ...(phoneNumber && { phoneNumber }),
    })
  )
);
```

`CustomerRepository.ts`

```ts
return result.data.results.filter(
  (item: RandomUser) =>
    (customer.name &&
      item.name.first.toLowerCase().startsWith(customer.name.toLowerCase())) ||
    (customer.lastName &&
      item.name.last
        .toLowerCase()
        .startsWith(customer.lastName.toLowerCase())) ||
    (customer.phoneNumber &&
      item.phone.toLowerCase().startsWith(customer.phoneNumber.toLowerCase()))
);
```

- One improvement about a dependency is the change of `jest` to `vitest` because it's faster and has a better performance

- Encapsulate api responses in `responses.ts` to avoid repeating the same code

```ts
export const apiBadRequestError = () => ({
  statusCode: 400,
  isBase64Encoded: false,
});

export const apiOk = <T>(body: T) => ({
  statusCode: 200,
  isBase64Encoded: false,
  body: JSON.stringify(body),
});
```

- Route management proposal

```ts
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
```
