// Tipos reutilizáveis para o sistema de produtos

export interface ProductImage {
  id: string;
  product_id?: string;
  image_url: string;
  is_primary: boolean;
  created_at?: string;
}

export interface ProductVariant {
  id: string;
  product_id?: string;
  sku: string;
  color: string;
  size: string;
  stock: number;
  price: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductAttribute {
  id: string;
  product_id?: string;
  attribute_name: string;
  attribute_value: string;
  created_at?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  badge?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductDetailsProps {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: ProductImage[];
  variants: ProductVariant[];
  attributes: ProductAttribute[];
  deliveryDays?: number;
  revisions?: number;
  badge?: string;
}
