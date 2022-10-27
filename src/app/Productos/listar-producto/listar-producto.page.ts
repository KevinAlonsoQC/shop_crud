import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicio/api.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { Producto, ProductoID } from '../../Modelos/producto';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.page.html',
  styleUrls: ['./listar-producto.page.scss'],
})
export class ListarProductoPage implements OnInit {

  @ViewChild(IonInfiniteScroll)
  public scroll: IonInfiniteScroll;
  public productos: Array<ProductoID> = [];

  public texto_carga: string = "Trayendo más para ti <3";

  constructor(
    private api: ApiService,
    private router: Router,
    private ruteador: ActivatedRoute,
    private alertController: AlertController
  ) { }

  ngOnInit() {}

  ionViewWillEnter(){

    this.ruteador.params.subscribe( parametros => {
      this.api.CallBack_Productos()
      this.api.$Productos_Lista.subscribe(datosActualizados =>
        {
          this.productos = datosActualizados;
          if(this.scroll){
            this.scroll.complete();
          }
        }
      )
    });

    this.api.CallBack_Productos()
    this.api.$Productos_Lista.subscribe(datosActualizados =>
      {
        this.productos = datosActualizados;
        if(this.scroll){
          this.scroll.complete();
        }
      }
    )
  }

  cargarMasDatos(){
    this.api.CallBack_More_Productos();
  }

  async delete_producto(pro: ProductoID) {
    const alert = await this.alertController.create({
      header: '¿Seguro de Eliminar este Producto?',
      subHeader: 'Producto: '+pro.nombre+' #'+pro.id,
      buttons: [
        {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'danger',
        },
        {
            text: 'Eliminar',
            handler: () => {
              this.api.DeleteProductoId(pro.id).subscribe();
              this.router.navigateByUrl('/');
            }
        }
    ]
    });

    await alert.present();
  }

}
