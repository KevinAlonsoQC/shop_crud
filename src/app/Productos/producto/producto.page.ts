import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from '../../servicio/api.service';
import { ProductoID } from '../../Modelos/producto';
import { CarritoID } from 'src/app/Modelos/carrito';

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


  public carro: Array<CarritoID> = [];

  public dont_carro: boolean = false;

  public agregadoRecien: boolean = false;

  public msjError: boolean = false;
  constructor(
    private api: ApiService,
    private router: Router,
    private ruteador: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.agregadoRecien = false;
    this.msjError = false;
    var array = JSON.parse(localStorage.getItem('infoUser'));
    this.id_usuario = array.id

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

      this.api.CallBack_Carritos().subscribe(carro => {
        var longitud = 0;
        for(let k of carro){
          longitud = longitud + 1
        }
        if(longitud > 0){
          console.log('el carro es verdadero')
          this.carro = carro
        }else{
          console.log('dont carro qlo es falso?')
          this.dont_carro = true;
        }
      })
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

  giveItemCarrito(){
    //if(this.get_cantidad <= this.max_stock){
      var id_item = 0;
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
        id_item = pro.id
      }

      this.api.UpdateProductoId(id_item, {stock: (this.max_stock-this.get_cantidad)}).subscribe();
      this.api.AddCarrito(item).subscribe();
      this.agregadoRecien = true;
    //  if(this.dont_carro == false){
    //    for(let value of this.carro){
    //      if(value.owner == item.owner && value.id_producto == item.id_producto){
    //        console.log('--------------------')
    //        console.log('Carrito: '+item.total)
    //        console.log('Value: '+item.total)
    //        console.log('Mezclados: '+(item.total+value.total))
    //        console.log('--------------------')
    //
    //        item.cantidad = item.cantidad + value.cantidad
    //        item.total = value.total + item.total
    //        this.api.UpdateCarrito(value.id, item).subscribe();
    //      }
    //      else{
    //        console.log('Else, porque existe el dueño pero no el producto')
    //        this.api.AddCarrito(item).subscribe();
    //      }
    //    }
    //  }else{
    //    console.log('no hay carro, lo agrego')
    //    this.api.AddCarrito(item).subscribe();
    //  }
    //  this.msjError = false;
    //  this.agregadoRecien = true;
    //}
    //else{
    //  this.agregadoRecien = false;
    //  this.msjError = true;
    //}
  }
}
