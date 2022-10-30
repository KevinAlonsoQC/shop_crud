import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndexPageRoutingModule } from './index-routing.module';

import { IndexPage } from './index.page';

import { HttpClientModule } from '@angular/common/http';

import { ApiService } from '../../servicio/api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndexPageRoutingModule,
    HttpClientModule
  ],
  declarations: [IndexPage],
  providers: [ApiService]
})
export class IndexPageModule {}
