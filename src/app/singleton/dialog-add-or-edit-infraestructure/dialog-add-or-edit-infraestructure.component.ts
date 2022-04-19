import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-or-edit-infraestructure',
  templateUrl: './dialog-add-or-edit-infraestructure.component.html',
  styleUrls: ['./dialog-add-or-edit-infraestructure.component.css']
})
export class DialogAddOrEditInfraestructureComponent implements OnInit {

  infraestructures = [ 
    "Red eléctrica",
    "Red de datos",
    "Sistema de enfriamiento",
    "Hardware",
    "Software",
    "Sistema de extintores",
   ]

   personas = [
     'Raúl',
     'Paloma',
     'Lizbeth',
     'Elon Musk', 
     'René'
   ]

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
