import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CataloguesRoutingModule } from './catalogues-routing.module';
import { CataloguesComponent } from './catalogues.component';
import { CatalogueAreaComponent } from './catalogue-area/catalogue-area.component';
import { CatalogueMarcaComponent } from './catalogue-marca/catalogue-marca.component';
import { CatalogueModeloComponent } from './catalogue-modelo/catalogue-modelo.component';
import { MaterialModule } from '../../material/material/material.module';
import { CatalogueCategoriaComponent } from './catalogue-categoria/catalogue-categoria.component';
import { FormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    CataloguesComponent,
    CatalogueAreaComponent,
    CatalogueMarcaComponent,
    CatalogueModeloComponent,
    CatalogueCategoriaComponent
  ],
  imports: [
    CommonModule,
    CataloguesRoutingModule,
    MaterialModule,
    FormsModule,
    LottieModule.forRoot({ player: playerFactory }),
  ]
})
export class CataloguesModule { }
