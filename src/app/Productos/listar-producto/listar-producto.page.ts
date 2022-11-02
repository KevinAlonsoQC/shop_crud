import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
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

  public admin: boolean = false;
  public id_usuario: number;

  constructor(
    private api: ApiService,
    private router: Router,
    private ruteador: ActivatedRoute,
    private alertController: AlertController
  ) { }

  ngOnInit() {}

  ionViewWillEnter(){

    var array = JSON.parse(localStorage.getItem('infoUser'));
    this.id_usuario = array.id

    if(localStorage.getItem('admin')){
      console.log('Es administrador')
      this.admin = true
    }
    else if(localStorage.getItem('noadmin')){
      console.log('no es administrador')
      this.admin = false
    }
    else{
      console.log('¿eLSE?')
      localStorage.clear();
      this.router.navigateByUrl('/')
    }

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

  async update_producto(pro: ProductoID) {
    const alert = await this.alertController.create({
      header: '¿Seguro de Editar este Producto?',
      subHeader: 'Producto: '+pro.nombre+' #'+pro.id,
      buttons: [
        {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'danger',
        },
        {
            text: 'Editar',
            handler: () => {
              this.ruteador.params.subscribe((params : Params) => {
                this.router.navigate(['/modificar-producto', pro.id])
              });
            }
        }
    ]
    });

    await alert.present();
  }

}
