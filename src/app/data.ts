export const API_URL = 'http://localhost:3001/';
export const API_LIST_URL = 'http://localhost:5000/';

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  categoryId: number;
}

export const categories: string[] = [];
export const productsByCategory: { [key: string]: string[] } = {};
