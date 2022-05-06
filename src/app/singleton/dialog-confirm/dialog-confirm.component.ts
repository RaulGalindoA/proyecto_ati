import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css'],
})
export class DialogConfirmComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<AppComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {}

  options: AnimationOptions = {
    path: '/assets/lottie/warning-lottie.json',
  };

  animationCreated(animationItem: AnimationItem): void {}

  ngOnInit(): void {}

  cerrar(confirmacion: boolean) {
    this.dialogRef.close(confirmacion);
  }
}
