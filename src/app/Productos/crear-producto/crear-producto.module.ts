import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearProductoPageRoutingModule } from './crear-producto-routing.module';

import { CrearProductoPage } from './crear-producto.page';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ApiService } from '../../servicio/api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearProductoPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [CrearProductoPage],
  providers: [ApiService]
})
export class CrearProductoPageModule {}
