import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearClientePageRoutingModule } from './crear-cliente-routing.module';

import { CrearClientePage } from './crear-cliente.page';


import { HttpClientModule } from '@angular/common/http';

import { ApiService } from '../../servicio/api.service';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearClientePageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [CrearClientePage],
  providers: [ApiService]
})
export class CrearClientePageModule {}
