import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarAdminPageRoutingModule } from './modificar-admin-routing.module';

import { ModificarAdminPage } from './modificar-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarAdminPageRoutingModule
  ],
  declarations: [ModificarAdminPage]
})
export class ModificarAdminPageModule {}
