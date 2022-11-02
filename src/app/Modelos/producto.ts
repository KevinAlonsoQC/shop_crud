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
  cm_ancho: number;
  cm_largo: number;
  cm_profundo: number;

}
export interface ProductoID extends Producto{
  id: number;
}
export interface ProductoOp extends Partial<Producto>{}

