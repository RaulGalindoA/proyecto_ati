import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-dialog-response',
  templateUrl: './dialog-response.component.html',
  styleUrls: ['./dialog-response.component.css']
})
export class DialogResponseComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  optionsSuccess: AnimationOptions = {
    path: '/assets/lottie/success.json',
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  ngOnInit(): void {
  }

}
