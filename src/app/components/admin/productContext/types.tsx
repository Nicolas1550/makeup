
export interface Product {
    marca: string;
    imagen_url: string;
    id: number;
    nombre: string;
    precio: number;
    stock: number;
  }
  export interface DecodedToken {
    role: string;
    id: string;
    [key: string]: any;
  }