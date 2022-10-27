export interface Admin {
  nombre:string;
  apellido_p:string;
  apellido_m:string;
  edad:number;
  correo:string;
  celular:number;
  clave:number;
  nivel:number;
}
export interface AdminID extends Admin{
  id: number;
}

export interface AdminOp extends Partial<Admin>{}

