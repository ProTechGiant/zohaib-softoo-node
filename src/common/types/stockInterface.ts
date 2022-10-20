export interface Stock {
  sku: string;
  stock: number;
}

export interface Transactions {
  sku: string;
  type: string;
  qty: number;
}

export interface AvaliableStock {
  sku: string;
  stock: number;
  newAvaliableStock: number | undefined;
}
export interface CommonInterface {
  message: string;
  status: number;
  success: boolean;
  data?: AvaliableStock;
}

export interface Error {
  status: number;
  message: string;
  success: boolean;
}
export interface ErrorInterface {
  syscall: string;
  code: string;
}
export interface AddressInterface {
  address: string | null;
  family: string | null;
  port: number | null;
}
