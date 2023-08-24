import { CustomersServiceImpl } from './impl';
import { repository } from '../repository';

export const service = new CustomersServiceImpl(repository);
