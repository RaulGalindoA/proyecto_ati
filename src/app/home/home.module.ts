import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material/material/material.module';
import { InfraestructureComponent } from './infraestructure/infraestructure.component';
import { PersonalComponent } from './personal/personal.component';
import { WelcomeComponent } from './welcome/welcome.component';


@NgModule({
  declarations: [
    HomeComponent,
    InfraestructureComponent,
    PersonalComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule, 
    MaterialModule
  ]
})
export class HomeModule { }
