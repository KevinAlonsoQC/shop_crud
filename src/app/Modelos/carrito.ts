export interface Carrito {
  items: {};
  total: number;
  pagado: boolean;
}
export interface CarritoID extends Carrito{
  id: number;
}

export interface CarritoOp extends Partial<Carrito>{}

