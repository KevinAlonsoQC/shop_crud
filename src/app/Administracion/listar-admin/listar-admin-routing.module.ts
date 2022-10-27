import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarAdminPage } from './listar-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ListarAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarAdminPageRoutingModule {}
