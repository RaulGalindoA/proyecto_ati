import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { DialogData } from '../../interfaces/dialog-data';

@Component({
  selector: 'app-dialog-response',
  templateUrl: './dialog-response.component.html',
  styleUrls: ['./dialog-response.component.css']
})
export class DialogResponseComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  optionsSuccess: AnimationOptions = {
    path: '/assets/lottie/success.json',
  }

  optionsError: AnimationOptions = {
    path: '/assets/lottie/error-lottie.json',
  }

  animationCreated(animationItem: AnimationItem): void {
  }

  ngOnInit(): void {
  }

}
