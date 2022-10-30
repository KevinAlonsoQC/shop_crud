import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, pipe } from 'rxjs';
import { delay } from 'rxjs/operators';

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
  api = 'http://localhost:5000/productos';
  NowPage = 1;

  cache_productos = new BehaviorSubject<Array<ProductoID>>([]);
  $Productos_Lista = this.cache_productos.asObservable();

  constructor(private http:HttpClient) { }

  //Producto
  CallBack_Productos(){
    this.http.get<Array<ProductoID>>(`${this.api}?_page=1`).subscribe(datos =>
      {
        this.NowPage = this.NowPage + 1;
        this.cache_productos.next(datos);
      }
    );
  }

  CallBack_More_Productos(){
    this.http.get<Array<ProductoID>>(`${this.api}?_page=${this.NowPage}`).pipe(delay(600)).subscribe(datos =>
      {
        if(datos){
          this.NowPage = this.NowPage + 1;
          this.cache_productos.next(this.cache_productos.getValue().concat(datos)); //concat: combina listas iguales
        }
      }
    );
  }

  CallBack_One_Producto(id: number): Observable<ProductoID | null> {
    return this.http.get<ProductoID | null>(`${this.api}/${id}`);
  }

  AddProducto(producto: Producto){
    return this.http.post(this.api, producto, httpOptions)
  }

  GetProductoId(id: number): Observable<ProductoID | null> {
    return this.http.get<ProductoID | null>(`${this.api}/${id}`);
  }

  DeleteProductoId(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`)
  }

  UpdateProductoId(id: number, payload: ProductoOp): Observable<any>{
    return this.http.patch(`${this.api}/${id}`, payload, httpOptions)
  }
}
