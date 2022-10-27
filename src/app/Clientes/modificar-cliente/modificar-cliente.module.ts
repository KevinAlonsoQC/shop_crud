import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarClientePageRoutingModule } from './modificar-cliente-routing.module';

import { ModificarClientePage } from './modificar-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarClientePageRoutingModule
  ],
  declarations: [ModificarClientePage]
})
export class ModificarClientePageModule {}
