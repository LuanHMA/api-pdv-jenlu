export interface Product {
  id: number;
  name: string;           // Nome do item
  barcode: string;        // Código EAN/GTIN (Código de barras)
  category_id: number;    // Categoria (FK)
  stock_quantity: number; // Estoque atual (Decimal para permitir KG)
  sale_price: number;     // Preço de venda
  expiration_date?: Date; // Data de validade
}

export type CreateProductDTO = Omit<Product, 'id'>;

export type UpdateProductDTO = Partial<CreateProductDTO>;