import { CustomersRepository } from '../CustomersRepository';
import { Customer } from '../../domain/Customer';
import { RandomUser } from '../../interfaces';
import axios from 'axios';

export class CustomersRepositoryImpl implements CustomersRepository {
  async findByFilter(customer: Customer): Promise<Customer[]> {
    const result = await axios.get('https://randomuser.me/api/?results=100');

    if (!result.data.results) return [];

    return result.data.results
      .filter(
        (item: RandomUser) =>
          (customer.name &&
            item.name.first
              .toLowerCase()
              .startsWith(customer.name.toLowerCase())) ||
          (customer.lastName &&
            item.name.last
              .toLowerCase()
              .startsWith(customer.lastName.toLowerCase())) ||
          (customer.phoneNumber &&
            item.phone
              .toLowerCase()
              .startsWith(customer.phoneNumber.toLowerCase()))
      )
      .map(
        (item: RandomUser) =>
          new Customer({
            id: item.id.value,
            name: item.name.first,
            lastName: item.name.last,
            phoneNumber: item.phone,
          })
      );
  }

  private createCustomerInstance = () =>
    axios.create({
      baseURL: 'https://randomuser.me/api',
      timeout: 1000,
    });
}
