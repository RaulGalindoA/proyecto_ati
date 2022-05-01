import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material/material/material.module';
import { InfraestructureComponent } from './infraestructure/infraestructure.component';
import { PersonalComponent } from './personal/personal.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { MyProfileComponent } from './my-profile/my-profile.component';


export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    HomeComponent,
    InfraestructureComponent,
    PersonalComponent,
    WelcomeComponent,
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule, 
    MaterialModule,
    LottieModule.forRoot({ player: playerFactory }),
  ]
})
export class HomeModule { }
