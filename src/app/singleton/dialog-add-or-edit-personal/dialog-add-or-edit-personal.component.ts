import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-or-edit-personal',
  templateUrl: './dialog-add-or-edit-personal.component.html',
  styleUrls: ['./dialog-add-or-edit-personal.component.css']
})
export class DialogAddOrEditPersonalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
