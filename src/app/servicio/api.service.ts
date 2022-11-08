import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, pipe, Subject } from 'rxjs';
import { delay, map, filter } from 'rxjs/operators';

//Modelos//
import { Producto, ProductoID, ProductoOp } from '../Modelos/producto';
import { Carrito, CarritoID, CarritoOp } from '../Modelos/carrito';
import { Cliente, ClienteID, ClienteOp } from '../Modelos/cliente';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json;charset=utf-8'
  })
}


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  api_productos = 'http://localhost:5000/productos';
  api_clientes = 'http://localhost:5000/clientes';
  api_carritos = 'http://localhost:5000/carrito';

  NowPage = 1;

  private cache_productos = new BehaviorSubject<Array<ProductoID>>([]);
  $Productos_Lista = this.cache_productos.asObservable();


  constructor(private http:HttpClient) { }

  //Carrito
  CallBack_Carritos(): Observable<any>{
    return this.http.get<Array<CarritoID>>(this.api_carritos);
  }

  CallBack_One_Carrito(id: number): Observable<CarritoID[]> {
    return this.http.get<CarritoID[]>(`${this.api_carritos}/${id}`);
  }

  AddCarrito(carrito: Carrito):Observable<any>{
    return this.http.post(this.api_carritos, carrito, httpOptions);
  }

  DeleteCarrito(id: number): Observable<any> {
    return this.http.delete(`${this.api_carritos}/${id}`);
  }

  UpdateCarrito(id: number, payload: CarritoOp): Observable<any>{
    return this.http.patch(`${this.api_carritos}/${id}`, payload, httpOptions);
  }







  //Usuarios
  CallBack_Usuarios(): Observable<any>{
    return this.http.get<Array<ClienteID>>(this.api_clientes);
  }

  CallBack_One_Usuario(id: number): Observable<ClienteID[]> {
    return this.http.get<ClienteID[]>(`${this.api_clientes}/${id}`);
  }

  AddUsuario(user: Cliente){
    return this.http.post(this.api_clientes, user, httpOptions);
  }

  DeleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.api_clientes}/${id}`);
  }

  UpdateUsuario(id: number, payload: ClienteOp): Observable<any>{
    return this.http.patch(`${this.api_clientes}/${id}`, payload, httpOptions)
  }









  //Producto
  CallBack_All_Productos(){
    return this.http.get<Array<ProductoID>>(this.api_productos);
  }

  CallBack_Productos(){
    this.http.get<Array<ProductoID>>(`${this.api_productos}?_page=1`).subscribe(datos =>
      {
        this.NowPage = this.NowPage + 1;
        this.cache_productos.next(datos);
      }
    );
  }

  CallBack_More_Productos(){
    this.http.get<Array<ProductoID>>(`${this.api_productos}?_page=${this.NowPage}`).subscribe(datos =>
      {
        if(datos){
          this.NowPage = this.NowPage + 1;
          this.cache_productos.next(this.cache_productos.getValue().concat(datos)); //concat: combina listas iguales
        }
      }
    );
  }

  CallBack_One_Producto(id: number): Observable<ProductoID | null> {
    return this.http.get<ProductoID | null>(`${this.api_productos}/${id}`);
  }

  AddProducto(producto: Producto){
    return this.http.post(this.api_productos, producto, httpOptions)
  }

  DeleteProductoId(id: number): Observable<any> {
    return this.http.delete(`${this.api_productos}/${id}`)
  }

  UpdateProductoId(id: number, payload: ProductoOp): Observable<any>{
    return this.http.patch(`${this.api_productos}/${id}`, payload, httpOptions)
  }

}
