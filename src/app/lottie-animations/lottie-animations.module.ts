import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  exports: [

  ]
})
export class LottieAnimationsModule { }
