import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { InfraestructureComponent } from './infraestructure/infraestructure.component';
import { PersonalComponent } from './personal/personal.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UsersComponent } from './users/users.component';
import { MisEquiposComponent } from './mis-equipos/mis-equipos.component';
import { AdminGuard } from '../services/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        canActivate: [AdminGuard],
        path: 'infraestructure', 
        component: InfraestructureComponent
      },
      {
        canActivate: [AdminGuard],
        path: 'personal', 
        component: PersonalComponent
      },
      {
        canActivate: [AdminGuard],
        path: 'catalogues',
        loadChildren: () => import('./catalogues/catalogues.module').then(m => m.CataloguesModule)
      },
      {
        path: 'landing',
        component: WelcomeComponent
      },
      {
        path: 'profile',
        component: MyProfileComponent
      },
      {
        canActivate: [AdminGuard],
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'mis_equipos',
        component: MisEquiposComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'landing'
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
export class HomeRoutingModule { }
