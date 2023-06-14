import { SellerInterface } from 'interfaces/seller';
import { GetQueryInterface } from 'interfaces';

export interface KeywordInterface {
  id?: string;
  keyword: string;
  seller_id: string;
  created_at?: any;
  updated_at?: any;

  seller?: SellerInterface;
  _count?: {};
}

export interface KeywordGetQueryInterface extends GetQueryInterface {
  id?: string;
  keyword?: string;
  seller_id?: string;
}
