export interface Producto {
  nombre:string;
  detalle:string;
  precio:number;
  en_oferta:boolean;
  precio_oferta:number;
  stock:number;
  talla:number;
  material:string;
  made_in:string;
  tipo:string; //zapatilla, polera, short, etc
  img:string;

}
export interface ProductoID extends Producto{
  id: number;
}
export interface ProductoOp extends Partial<Producto>{}

