import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Staff } from 'src/app/interfaces/staff/staff';
import { MainService } from '../../services/main.service';
import { Marca } from '../../interfaces/marca';
import { Modelo } from '../../interfaces/modelo/modelo';
import { Area } from '../../interfaces/area/area';

@Component({
  selector: 'app-dialog-add-or-edit-infraestructure',
  templateUrl: './dialog-add-or-edit-infraestructure.component.html',
  styleUrls: ['./dialog-add-or-edit-infraestructure.component.css']
})
export class DialogAddOrEditInfraestructureComponent implements OnInit {

  marcas?: Marca[];
  modelos?: Modelo[];
  areas?: Area[];
  staffs?: Staff[];

  constructor(private mainService: MainService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.mainService.getMarcas().subscribe(
      resp => {
        this.marcas = resp;
      }
    )
    this.mainService.getAreas().subscribe(
      resp => {
        this.areas = resp;
      }
    )
    this.mainService.getModelos().subscribe(
      resp => {
        this.modelos = resp;
      }
    )
    this.mainService.getStaffs().subscribe(
      resp => {
        this.staffs = resp;
      }
    )
  }

}
