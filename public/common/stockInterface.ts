export interface Stock {
  sku: string;
  stock: number;
}
export interface Transactions {
  sku: string;
  type: string;
  qty: number;
}

export interface AvailableStock {
  sku?: string;
  stock?: number;
  newAvailableStock?: number;
}
export interface CommonInterface {
  sku: string;
  stock?: number;
  type?: string;
  qty?: number;
}
