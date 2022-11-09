import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CarritoID } from 'src/app/Modelos/carrito';
import { ApiService } from '../../servicio/api.service';
import { BehaviorSubject } from 'rxjs';
import { ProductoID } from '../../Modelos/producto';
import { LoadingController,AlertController  } from '@ionic/angular';

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
  public msjErrorInferior: boolean = false;
  public mensaje: string = '';


  public loading_bucle: boolean = false;

  public total_pago: number = 0;

  constructor(
    private api: ApiService,
    private router: Router,
    private ruteador: ActivatedRoute,
    private loading: LoadingController,
    private alerta: AlertController
  ){ }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.ruteador.params.subscribe(parametros => {
      this.idCliente = parametros.idCliente;
    })

    this.obtenerDatos();
    this.api.CallBack_All_Productos().subscribe(data => {this.productos = data})
  }

  async removeItemCarrito(pro:CarritoID){
    for(let value of this.productos){
      if(value.id == pro.id_producto){
        if(pro.cantidad > 1){
          this.loading_bucle = true;
          pro.cantidad = pro.cantidad - 1
          pro.total = pro.cantidad*pro.precio
          this.total_pago = this.total_pago - pro.precio

          this.api.UpdateProductoId(value.id, {stock: value.stock+1}).subscribe()
          await this.sleep(1600);
          this.api.UpdateCarrito(pro.id, {cantidad:pro.cantidad, total: pro.total}).subscribe()
          this.loading_bucle = false;
        }else{
          this.mostrar_alerta('Alerta', '¡Atención!', '¡No puedes llevar una cantidad inferior a 1!');
        }
      }
    }
    this.api.CallBack_All_Productos().subscribe(data => {this.productos = data})
  }

  async addItemCarrito(pro:CarritoID){
    for(let value of this.productos){
      if(value.id >= pro.id_producto){
        if(value.stock >= pro.cantidad){
          this.loading_bucle = true;
          pro.cantidad = pro.cantidad + 1
          pro.total = pro.cantidad*pro.precio
          this.total_pago = this.total_pago + pro.precio

          this.api.UpdateProductoId(value.id, {stock: value.stock-1}).subscribe();
          await this.sleep(1600);
          this.api.UpdateCarrito(pro.id, {cantidad:pro.cantidad, total: pro.total}).subscribe();
          this.loading_bucle = false;
        }else{
          this.mostrar_alerta('Alerta', '¡Atención!', '¡No puedes llevar más del stock disponible!');
        }
      }
    }
    this.api.CallBack_All_Productos().subscribe(data => {this.productos = data})
  }

  async deleteItemCarrito(pro:CarritoID){
    for(let value of this.productos){
      if(value.id == pro.id_producto){
        this.loading_bucle = true;

        this.api.UpdateProductoId(value.id, {stock: value.stock+pro.cantidad}).subscribe();
        this.showLoading();

        await this.sleep(3000);
        this.api.DeleteCarrito(pro.id).subscribe();
        this.loading_bucle = false;

        this.total_pago = this.total_pago - pro.total
        this.router.navigateByUrl('listar-producto')
      }
    }

  }

  async showLoading() {
    const loading = await this.loading.create({
      message: 'Eliminando Producto del Carrito',
      duration: 2600,
    });

    loading.present();
  }

  async mostrar_alerta(titulo, desc, msg) {
    const alert = await this.alerta.create({
      header: titulo,
      subHeader: desc,
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  borrarCache(){
    this.cache_carro = new BehaviorSubject<Array<CarritoID>>([]);
    this.carrito = [];
    this.total_pago = 0;
  }

  obtenerDatos(){
    this.api.CallBack_Carritos().subscribe(carro => {
      if(carro){

        for(let value of carro){
          if(value.owner == this.idCliente){

            this.cache_carro.next(this.cache_carro.getValue().concat(value));
            this.total_pago = this.total_pago + (value.precio*value.cantidad)
          }
        }

        this.$carrito_usuario.subscribe(numbero => {
          this.carrito = numbero
        })
      }
    })
  }
}


