import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComprarCarritoPageRoutingModule } from './comprar-carrito-routing.module';

import { ComprarCarritoPage } from './comprar-carrito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComprarCarritoPageRoutingModule
  ],
  declarations: [ComprarCarritoPage]
})
export class ComprarCarritoPageModule {}
