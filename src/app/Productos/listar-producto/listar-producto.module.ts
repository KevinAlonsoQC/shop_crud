import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarProductoPageRoutingModule } from './listar-producto-routing.module';

import { ListarProductoPage } from './listar-producto.page';

import { HttpClientModule } from '@angular/common/http';

import { ApiService } from '../../servicio/api.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarProductoPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ListarProductoPage],
  providers: [ApiService]
})
export class ListarProductoPageModule {}
