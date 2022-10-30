import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SesionIniciadaPage } from './sesion-iniciada.page';

const routes: Routes = [
  {
    path: '',
    component: SesionIniciadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SesionIniciadaPageRoutingModule {}
