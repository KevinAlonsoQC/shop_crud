import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../servicio/api.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.page.html',
  styleUrls: ['./crear-cliente.page.scss'],
})
export class CrearClientePage implements OnInit {

  public formulario: FormGroup;

  constructor(
    private api: ApiService,
    private _builder: FormBuilder,
    private router: Router
  ) {
    this.formulario = this._builder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]
      ],

      apellido_p: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]
      ],

      apellido_m: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]
      ],

      edad: [
        0,
        [
          Validators.required,
          Validators.min(18),
          Validators.max(100)
        ]
      ],

      correo: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],

      celular: [
        0,
        [
          Validators.required,
          Validators.min(900000000),
          Validators.max(999999999)
        ]
      ],

      clave: [
        0,
        [
          Validators.required,
          Validators.min(1000),
          Validators.max(9999)
        ]
      ],

      admin: [
        0,
        [
          Validators.required
        ]
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

  ngOnInit() {
  }

  saveCuenta(): void {
    if(this.formulario.invalid){
      this.formulario.markAllAsTouched();
      return;
    }

    if(this.formulario.value.admin == 1){
      this.formulario.value.admin = true;
    }
    else{
      this.formulario.value.admin = false;
    }

    this.api.AddUsuario({...this.formulario.value}).subscribe(resultado =>
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
