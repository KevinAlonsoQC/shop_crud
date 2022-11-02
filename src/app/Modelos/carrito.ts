export interface Carrito {
  nombre: string;
  precio: number;
  cantidad: number;
  total: number;
  owner: number;
}
export interface CarritoID extends Carrito{
  id: number;
}

export interface CarritoOp extends Partial<Carrito>{}

