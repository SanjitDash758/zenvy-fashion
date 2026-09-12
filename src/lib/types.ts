export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description: string;
  short_description: string;
  images: ProductImage[];
  categories: Category[];
  stock_status: "instock" | "outofstock";
  attributes: ProductAttribute[];
  variations: number[];
}

export interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: ProductImage | null;
  count: number;
}

export interface ProductAttribute {
  id: number;
  name: string;
  options: string[];
}