import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { InfraestructureComponent } from './infraestructure/infraestructure.component';
import { PersonalComponent } from './personal/personal.component';
import { WelcomeComponent } from './welcome/welcome.component';

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
        path: 'welcome',
        component: WelcomeComponent
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
