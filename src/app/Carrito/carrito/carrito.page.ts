import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CarritoID } from 'src/app/Modelos/carrito';
import { ApiService } from '../../servicio/api.service';
import { BehaviorSubject } from 'rxjs';
import { ProductoID } from '../../Modelos/producto';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  private idCliente: number;
  public carrito: Array<CarritoID> = [];
  public productos: Array<ProductoID> = [];

  private cache_carro = new BehaviorSubject<Array<CarritoID>>([]);
  $carrito_usuario = this.cache_carro.asObservable();

  public msjError: boolean = false;
  public mensaje: string = '';


  public loading_bucle: boolean = false;

  constructor(
    private api: ApiService,
    private _builder: FormBuilder,
    private router: Router,
    private ruteador: ActivatedRoute,
  ){ }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.ruteador.params.subscribe(parametros => {
      this.idCliente = parametros.idCliente;

      this.api.CallBack_Carritos().subscribe(carro => {
        if(carro){

          for(let value of carro){
            if(value.owner == this.idCliente){
              this.cache_carro.next(this.cache_carro.getValue().concat(value));
            }
          }

          this.$carrito_usuario.subscribe(numbero => {
            this.carrito = numbero
          })
        }
      })
    })

    this.api.CallBack_All_Productos().subscribe(data => {
      this.productos = data
    })
  }

  removeItemCarrito(pro:CarritoID){
    for(let value of this.productos){
      if(value.id == pro.id_producto){
        if(pro.cantidad > 1){
          this.loading_bucle = true;
          pro.cantidad = pro.cantidad - 1
          pro.total = pro.cantidad*pro.precio

          this.api.UpdateProductoId(value.id, {stock: value.stock+1}).subscribe()
          this.api.UpdateCarrito(pro.id, {cantidad:pro.cantidad, total: pro.total}).subscribe()
          this.loading_bucle = false;
        }else{
          this.mensaje = '¡No puedes llevar una cantidad inferior a 1!'
          this.msjError = true;
        }
        break
      }
    }
  }

  addItemCarrito(pro:CarritoID){
    for(let value of this.productos){
      if(value.id == pro.id_producto){
        if(value.stock >= pro.cantidad+1){
          this.loading_bucle = true;
          pro.cantidad = pro.cantidad + 1
          pro.total = pro.cantidad*pro.precio
          this.api.UpdateProductoId(value.id, {stock: value.stock-1}).subscribe()
          this.api.UpdateCarrito(pro.id, {cantidad:pro.cantidad, total: pro.total}).subscribe()
          this.loading_bucle = false;
          break
        }else{
          this.mensaje = '¡No puedes llevar más del stock disponible!'
          this.msjError = true;
          break
        }
      }
    }
  }

  deleteItemCarrito(pro:CarritoID){
    for(let value of this.productos){
      if(value.id == pro.id_producto){
        this.loading_bucle = true;
        this.api.UpdateProductoId(value.id, {stock: value.stock+pro.cantidad}).subscribe()
        delay(3000)
        this.api.DeleteCarrito(pro.id).subscribe(data => {
          if(data){
            this.router.navigate(['/index'])
          }
        })
        this.loading_bucle = false;
      }
    }
  }

}
