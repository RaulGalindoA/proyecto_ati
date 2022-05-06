import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CataloguesComponent } from './catalogues.component';
import { CatalogueAreaComponent } from './catalogue-area/catalogue-area.component';
import { CatalogueMarcaComponent } from './catalogue-marca/catalogue-marca.component';
import { CatalogueModeloComponent } from './catalogue-modelo/catalogue-modelo.component';
import { CatalogueCategoriaComponent } from './catalogue-categoria/catalogue-categoria.component';

const routes: Routes = [
  {
    path: '',
    component: CataloguesComponent,
    children: [
      {
        path: 'areas',
        component: CatalogueAreaComponent
      },
      {
        path: 'marcas',
        component: CatalogueMarcaComponent
      },
      {
        path: 'modelos',
        component: CatalogueModeloComponent
      },
      {
        path: 'categorias',
        component: CatalogueCategoriaComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'areas'
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CataloguesRoutingModule { }
