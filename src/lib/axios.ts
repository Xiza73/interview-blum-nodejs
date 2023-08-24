import axios from 'axios';

const createCustomerInstance = () =>
  axios.create({
    baseURL: 'https://randomuser.me/api/',
    timeout: 1000,
  });

export const CustomerClient = createCustomerInstance();
