import axios from 'axios';
import queryString from 'query-string';
import { AccountManagerInterface, AccountManagerGetQueryInterface } from 'interfaces/account-manager';
import { GetQueryInterface } from '../../interfaces';

export const getAccountManagers = async (query?: AccountManagerGetQueryInterface) => {
  const response = await axios.get(`/api/account-managers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAccountManager = async (accountManager: AccountManagerInterface) => {
  const response = await axios.post('/api/account-managers', accountManager);
  return response.data;
};

export const updateAccountManagerById = async (id: string, accountManager: AccountManagerInterface) => {
  const response = await axios.put(`/api/account-managers/${id}`, accountManager);
  return response.data;
};

export const getAccountManagerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/account-managers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAccountManagerById = async (id: string) => {
  const response = await axios.delete(`/api/account-managers/${id}`);
  return response.data;
};
