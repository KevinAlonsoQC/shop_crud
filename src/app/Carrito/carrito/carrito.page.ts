import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CarritoID } from 'src/app/Modelos/carrito';
import { ApiService } from '../../servicio/api.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  private idCliente: number;
  public carrito: Array<CarritoID> = [];

  private cache_carro = new BehaviorSubject<Array<CarritoID>>([]);
  $carrito_usuario = this.cache_carro.asObservable();

  constructor(
    private api: ApiService,
    private _builder: FormBuilder,
    private router: Router,
    private ruteador: ActivatedRoute,
  ){ }

  ngOnInit() {
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

        else{
          this.router.navigate(['index']);
        }
      })
    })
  }

  ionViewWillEnter(){

  }


}
