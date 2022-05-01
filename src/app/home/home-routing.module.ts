import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { InfraestructureComponent } from './infraestructure/infraestructure.component';
import { PersonalComponent } from './personal/personal.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'infraestructure', 
        component: InfraestructureComponent
      },
      {
        path: 'personal', 
        component: PersonalComponent
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
