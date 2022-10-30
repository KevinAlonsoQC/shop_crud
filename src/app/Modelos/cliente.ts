export interface Cliente {
  nombre:string;
  apellido_p:string;
  apellido_m:string;
  edad:number;
  correo:string;
  celular:number;
  clave:number;
  admin:boolean;
}
export interface ClienteID extends Cliente{
  id: number;
}

export interface ClienteOp extends Partial<Cliente>{}
