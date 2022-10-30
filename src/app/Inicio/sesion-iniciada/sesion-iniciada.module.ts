import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SesionIniciadaPageRoutingModule } from './sesion-iniciada-routing.module';

import { SesionIniciadaPage } from './sesion-iniciada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SesionIniciadaPageRoutingModule
  ],
  declarations: [SesionIniciadaPage]
})
export class SesionIniciadaPageModule {}
