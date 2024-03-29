import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoPageRoutingModule } from './producto-routing.module';

import { ProductoPage } from './producto.page';

import { HttpClientModule } from '@angular/common/http';

import { ApiService } from '../../servicio/api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ProductoPage],
  providers: [ApiService]
})
export class ProductoPageModule {}
