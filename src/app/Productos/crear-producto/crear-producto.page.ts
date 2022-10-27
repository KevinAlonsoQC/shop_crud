import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../servicio/api.service';
import { Producto } from '../../Modelos/producto';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.page.html',
  styleUrls: ['./crear-producto.page.scss'],
})
export class CrearProductoPage implements OnInit {

  public imagenCargando = false;
  public imagenBase64 = '';
  public formulario: FormGroup;

  constructor(
    private api: ApiService,
    private _builder: FormBuilder,
    private router: Router
  ){
    this.formulario = this._builder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]
      ],

      detalle: [
        '',
        [
          Validators.required, Validators.minLength(10)
        ]
      ],

      precio: [
        0,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      en_oferta: [
        0,
        [
          Validators.min(0)
        ]
      ],

      precio_oferta: [
        0,
        [
          Validators.min(0)
        ]
      ],

      stock: [
        0,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      talla: [
        0,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      material: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]
      ],

      made_in: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]
      ],

      tipo: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]
      ],

      img: [
        '',
        Validators.required
      ],


    })
  }

  campo(control: string) {
    return this.formulario.get(control);
  }

  fueTocado(control: string){
    return this.formulario.get(control).touched;
  }

  estaSucio(control: string){
    return this.formulario.get(control).dirty;
  }

  cargarFoto(e: Event){
    this.imagenCargando = true;
    const elemento = e.target as HTMLInputElement;
    const archivo = elemento.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(archivo);
    reader.onload = () => {
      this.imagenCargando = false;
      this.imagenBase64 = reader.result as string;
    }
  }

  ngOnInit() {
  }

  saveProducto(): void {
    if(this.formulario.invalid || this.imagenCargando){
      this.formulario.markAllAsTouched();
      return;
    }

    if(this.formulario.value.en_oferta == 1){
      this.formulario.value.en_oferta = true;
    }
    else{
      this.formulario.value.en_oferta = false;
    }

    this.api.AddProducto(
      {
        ...this.formulario.value,
        img: this.imagenBase64

      }).subscribe(resultado =>
      {
        if(resultado){
          this.formulario.reset();
          this.formulario.updateValueAndValidity();
          this.router.navigate(['']);
        }
      }
    )
  }

}
