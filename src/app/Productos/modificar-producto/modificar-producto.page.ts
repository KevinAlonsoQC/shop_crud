import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from '../../servicio/api.service';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.page.html',
  styleUrls: ['./modificar-producto.page.scss'],
})
export class ModificarProductoPage implements OnInit {
  private idProd: number;
  public imagenCargando = false;
  public imagenBase64 = '';
  public formulario: FormGroup;

  constructor(
    private api: ApiService,
    private _builder: FormBuilder,
    private router: Router,
    private ruteador: ActivatedRoute,
  ) {
    this.formulario = this._builder.group({
      nombre: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      detalle: ['',[Validators.required, Validators.minLength(10)]],
      precio: [0,[Validators.required,Validators.min(1)]],
      en_oferta: [0,[Validators.min(0)]],
      precio_oferta: [0,[Validators.min(0)]],
      stock: [0,[Validators.required,Validators.min(1)]],
      talla: [0,[Validators.required,Validators.min(1)]],
      material: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      made_in: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      tipo: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      img: ['',Validators.required],
      cm_ancho: [0,[Validators.required,Validators.min(10)]],
      cm_largo: [0,[Validators.required,Validators.min(10)]],
      cm_profundo: [0,[Validators.required,Validators.min(10)]],
    })
  }

  public campo(control: string) {
    return this.formulario.get(control);
  }
  public fueTocado(control: string){
    return this.formulario.get(control).touched;
  }
  public estaSucio(control: string){
    return this.formulario.get(control).dirty;
  }
  public cargarFoto(e: Event){
    this.imagenCargando = true;
    const elemento = e.target as HTMLInputElement;
    const archivo = elemento.files[0];
    console.log(archivo);
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload = () => {
      this.imagenCargando = false;
      console.log('Carga terminad a');
      this.imagenBase64 = reader.result as string;
    }
  }

  ngOnInit() {
    this.ruteador.params.subscribe(parametros => {
      this.idProd = parametros.idProducto;
      this.api.CallBack_One_Producto(this.idProd).subscribe(producto => {
        if(producto){
          this.imagenBase64 = producto.img;
          this.formulario.setValue({
            ...producto
          });
          this.formulario.updateValueAndValidity();
        }
        else{
          this.router.navigate(['']);
        }
      })
    })
  }

  public modificar(){
    if(this.formulario.invalid || this.imagenCargando){
      this.formulario.markAllAsTouched();
      return;
    }
    this.api.UpdateProductoId(this.idProd,{
      ...this.formulario.value, imagen: this.imagenBase64}).subscribe(datos => {
      if(datos){
        this.router.navigate(['']);
      }
    })
  }
}
