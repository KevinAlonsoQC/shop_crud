import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from '../../servicio/api.service';
import { ProductoID } from '../../Modelos/producto';

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

  constructor(
    private api: ApiService,
    private router: Router,
    private ruteador: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ruteador.params.subscribe(parametros => {
      this.idProducto = parametros.idProducto
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
    })
  }

  ionViewWillEnter(){
    var array = JSON.parse(localStorage.getItem('infoUser'));
    this.id_usuario = array.id
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

  giveItemCarrito(){
    for(let pro of this.producto){
      if(pro.en_oferta){
        var item = {
          nombre: pro.nombre,
          precio: pro.precio_oferta,
          cantidad: this.get_cantidad,
          total: this.total_pedido,
          owner: this.id_usuario,
          id_producto: pro.id
        }
      }else{
        var item = {
          nombre: pro.nombre,
          precio: pro.precio,
          cantidad: this.get_cantidad,
          total: this.total_pedido,
          owner: this.id_usuario,
          id_producto: pro.id
        }
      }
      this.api.UpdateProductoId(pro.id, {stock: (this.max_stock-this.get_cantidad)}).subscribe()
    }

    this.api.AddCarrito(item).subscribe(data => {
      if(data){
        console.log('Añadido con éxito')
        this.router.navigate(['/carrito', this.id_usuario]);
      }
    });
  }

}
