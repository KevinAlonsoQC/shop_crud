import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from '../../servicio/api.service';
import { ProductoID } from '../../Modelos/producto';
import { CarritoID } from 'src/app/Modelos/carrito';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  private idProducto: number;
  public id_usuario: number;
  public producto: Array<ProductoID> = [];
  public total_pedido: number = 0;
  public get_cantidad: number = 0;

  public max_stock: number = 0;
  public loading_add: boolean = false;

  public carro: Array<CarritoID> = [];

  public dont_carro: boolean = true;
  public msjError: boolean = false;
  constructor(
    private api: ApiService,
    private router: Router,
    private ruteador: ActivatedRoute,
    private loading: LoadingController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loading_add = false;
    var array = JSON.parse(localStorage.getItem('infoUser'));
    this.id_usuario = array.id

    this.msjError = false;

    this.ruteador.params.subscribe(parametros => {
      this.idProducto = parametros.idProducto
    })

    this.api.CallBack_One_Producto(this.idProducto).subscribe(producto => {
      if(producto){
        this.producto = [producto]
        this.max_stock = producto.stock
        //localStorage.setItem('infoProducto/'+this.id, JSON.stringify(this.producto));
      }
      else{
        this.router.navigateByUrl('index');
      }
    })

    this.api.CallBack_Carritos().subscribe(carro => {
      if(carro.length > 0){
        console.log('Si existe un carro')
        this.carro = carro
        this.dont_carro = false;
      }else{
        console.log('No existe un carrito')
      }
    })
  }

  addItem(){
    for(let pro of this.producto){
      this.get_cantidad = this.get_cantidad + 1

      if(pro.en_oferta){
        this.total_pedido = this.get_cantidad*pro.precio_oferta
      }else{
        this.total_pedido = this.get_cantidad*pro.precio
      }
    }
  }

  removeItem(){
    for(let pro of this.producto){
      this.get_cantidad = this.get_cantidad - 1

      if(pro.en_oferta){
        this.total_pedido = this.get_cantidad*pro.precio_oferta
      }else{
        this.total_pedido = this.get_cantidad*pro.precio
      }
    }
  }

  async giveItemCarrito(){
    this.loading_add = true;
    if(this.get_cantidad <= this.max_stock){
      var id_item = 0;
      var existe = false;

      for(let pro of this.producto){
        if(pro.en_oferta){
          var item = {nombre: pro.nombre, precio: pro.precio_oferta, cantidad: this.get_cantidad, total: this.total_pedido, owner: this.id_usuario, id_producto: pro.id}
        }
        else{
          var item = {nombre: pro.nombre, precio: pro.precio, cantidad: this.get_cantidad, total: this.total_pedido, owner: this.id_usuario, id_producto: pro.id}
        }

        id_item = pro.id
      }

      this.api.UpdateProductoId(id_item, {stock: (this.max_stock-this.get_cantidad)}).subscribe();
      this.showLoading()
      await this.sleep(3000);

      if(this.dont_carro == false){
        this.carro.filter(data => {
          if(data.owner == item.owner){
            //console.log('Dueños '+data.owner + ' ' + item.owner)
            if(data.id_producto == item.id_producto){
              //console.log('Productos '+ data.id_producto + ' ' + item.id_producto)
              existe = true;
              item.cantidad = item.cantidad + data.cantidad
              item.total = data.total + item.total
              this.api.UpdateCarrito(data.id, item).subscribe();
            }
          }
        })

        if(!existe){
          //console.log('Else, porque existe el dueño pero no el producto')
          this.api.AddCarrito(item).subscribe();
        }

      }else{
        //console.log('no hay carro, lo agrego')
        this.api.AddCarrito(item).subscribe();
      }

      this.msjError = false;
      this.ruteador.params.subscribe((params : Params) => {
        this.router.navigate(['/carrito', this.id_usuario])
      });

    }
    else{
      this.msjError = true;
    }
  }


  async showLoading() {
    const loading = await this.loading.create({
      message: 'Añadiendo al Carrito...',
      duration: 2600,
    });

    loading.present();
  }



  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
