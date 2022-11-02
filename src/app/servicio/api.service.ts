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
    return this.http.get<Array<CarritoID>>(this.api_carritos).pipe(delay(3000));
  }

  CallBack_One_Carrito(id: number): Observable<CarritoID[]> {
    return this.http.get<CarritoID[]>(`${this.api_carritos}/${id}`).pipe(delay(3000));
  }

  AddCarrito(carrito: Carrito){
    return this.http.post(this.api_carritos, carrito, httpOptions).pipe(delay(3000));
  }

  DeleteCarrito(id: number): Observable<any> {
    return this.http.delete(`${this.api_carritos}/${id}`).pipe(delay(3000));
  }

  UpdateCarrito(id: number, payload: CarritoOp): Observable<any>{
    return this.http.patch(`${this.api_carritos}/${id}`, payload, httpOptions).pipe(delay(3000));
  }







  //Usuarios
  CallBack_Usuarios(): Observable<any>{
    return this.http.get<Array<ClienteID>>(this.api_clientes).pipe(delay(3000));
  }

  CallBack_One_Usuario(id: number): Observable<ClienteID[]> {
    return this.http.get<ClienteID[]>(`${this.api_clientes}/${id}`).pipe(delay(3000));
  }

  AddUsuario(user: Cliente){
    return this.http.post(this.api_clientes, user, httpOptions).pipe(delay(3000));
  }

  DeleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.api_clientes}/${id}`).pipe(delay(3000));
  }

  UpdateUsuario(id: number, payload: ClienteOp): Observable<any>{
    return this.http.patch(`${this.api_clientes}/${id}`, payload, httpOptions).pipe(delay(3000))
  }









  //Producto
  CallBack_All_Productos(){
    return this.http.get<Array<ProductoID>>(this.api_productos).pipe(delay(3000));
  }

  CallBack_Productos(){
    this.http.get<Array<ProductoID>>(`${this.api_productos}?_page=1`).pipe(delay(3000)).subscribe(datos =>
      {
        this.NowPage = this.NowPage + 1;
        this.cache_productos.next(datos);
      }
    );
  }

  CallBack_More_Productos(){
    this.http.get<Array<ProductoID>>(`${this.api_productos}?_page=${this.NowPage}`).pipe(delay(3000)).subscribe(datos =>
      {
        if(datos){
          this.NowPage = this.NowPage + 1;
          this.cache_productos.next(this.cache_productos.getValue().concat(datos)); //concat: combina listas iguales
        }
      }
    );
  }

  CallBack_One_Producto(id: number): Observable<ProductoID | null> {
    return this.http.get<ProductoID | null>(`${this.api_productos}/${id}`).pipe(delay(3000));
  }

  AddProducto(producto: Producto){
    return this.http.post(this.api_productos, producto, httpOptions).pipe(delay(3000))
  }

  DeleteProductoId(id: number): Observable<any> {
    return this.http.delete(`${this.api_productos}/${id}`).pipe(delay(3000))
  }

  UpdateProductoId(id: number, payload: ProductoOp): Observable<any>{
    return this.http.patch(`${this.api_productos}/${id}`, payload, httpOptions).pipe(delay(3000))
  }

}
