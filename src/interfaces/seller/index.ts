import { AccountManagerInterface } from 'interfaces/account-manager';
import { GuestInterface } from 'interfaces/guest';
import { KeywordInterface } from 'interfaces/keyword';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SellerInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  account_manager?: AccountManagerInterface[];
  guest?: GuestInterface[];
  keyword?: KeywordInterface[];
  user?: UserInterface;
  _count?: {
    account_manager?: number;
    guest?: number;
    keyword?: number;
  };
}

export interface SellerGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
