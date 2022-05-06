import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogAddOrEditInfraestructureComponent } from '../../singleton/dialog-add-or-edit-infraestructure/dialog-add-or-edit-infraestructure.component';
import { DialogResponseComponent } from '../../singleton/dialog-response/dialog-response.component';
import { Equipo } from '../../interfaces/equipo';
import { MainService } from '../../services/main.service';
import { Marca } from '../../interfaces/marca';
import { Staff } from '../../interfaces/staff/staff';
import { Modelo } from '../../interfaces/modelo/modelo';
import { Area } from '../../interfaces/area/area';

@Component({
  selector: 'app-infraestructure',
  templateUrl: './infraestructure.component.html',
  styleUrls: ['./infraestructure.component.css'],
})
export class InfraestructureComponent implements OnInit {
  constructor(private route: ActivatedRoute, public dialog: MatDialog, private mainService: MainService) {}

  marcas?: Marca[];
  modelos?: Modelo[];
  areas?: Area[];
  staffs?: Staff[];

  ngOnInit(): void {
    this.mainService.getEquipos().subscribe(
      resp => {
        this.dataSource = resp;
      }
    )
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

  displayedColumns: string[] = ['nombre', 'num_serie', 'ultimo_mant', 'detalles', 'capacidad', 'unidad', 'modelo', 'marca', 'tipo', 'staff', 'area'];
  dataSource!: Equipo[];

  newInfraestructure() {
    const dialogRef = this.dialog.open(
      DialogAddOrEditInfraestructureComponent,
      {
        data: {
          animal: 'panda',
        },
        width: '500px',
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      const dialogRef = this.dialog.open(DialogResponseComponent, {
        data: {
          animal: 'panda',
        },
        width: '500px',
      });
      console.log(`Dialog result: ${result}`);
    });
  }
}
