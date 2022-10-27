import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarClientePage } from './modificar-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarClientePageRoutingModule {}
