import axios from 'axios';
import queryString from 'query-string';
import { SellerInterface, SellerGetQueryInterface } from 'interfaces/seller';
import { GetQueryInterface } from '../../interfaces';

export const getSellers = async (query?: SellerGetQueryInterface) => {
  const response = await axios.get(`/api/sellers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSeller = async (seller: SellerInterface) => {
  const response = await axios.post('/api/sellers', seller);
  return response.data;
};

export const updateSellerById = async (id: string, seller: SellerInterface) => {
  const response = await axios.put(`/api/sellers/${id}`, seller);
  return response.data;
};

export const getSellerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sellers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSellerById = async (id: string) => {
  const response = await axios.delete(`/api/sellers/${id}`);
  return response.data;
};
