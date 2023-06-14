import { UserInterface } from 'interfaces/user';
import { SellerInterface } from 'interfaces/seller';
import { GetQueryInterface } from 'interfaces';

export interface GuestInterface {
  id?: string;
  user_id: string;
  seller_id: string;
  access_status: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  seller?: SellerInterface;
  _count?: {};
}

export interface GuestGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  seller_id?: string;
  access_status?: string;
}
