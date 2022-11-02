import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarritoPageRoutingModule } from './carrito-routing.module';

import { CarritoPage } from './carrito.page';

import { HttpClientModule } from '@angular/common/http';

import { ApiService } from '../../servicio/api.service';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarritoPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [CarritoPage],
  providers: [ApiService]
})
export class CarritoPageModule {}
