import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogAddOrEditInfraestructureComponent } from '../../singleton/dialog-add-or-edit-infraestructure/dialog-add-or-edit-infraestructure.component';
import { DialogResponseComponent } from '../../singleton/dialog-response/dialog-response.component';
import { DialogAddOrEditPersonalComponent } from '../../singleton/dialog-add-or-edit-personal/dialog-add-or-edit-personal.component';
import { MainService } from '../../services/main.service';
import { Staff } from '../../interfaces/staff/staff';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private mainService: MainService) { }

  ngOnInit(): void {
    this.refreshPersonal()
  }

  displayedColumns: string[] = ['id', 'nombre', 'apellido_paterno', 'apellido_materno', 'direccion', 'telefono', 'mail', 'puesto', 'rfc', 'curp', 'num_staff'];

  dataSource: Staff[] = [];

  newPersonal() {
    const dialogRef = this.dialog.open(
      DialogAddOrEditPersonalComponent,
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

  refreshPersonal(){
    this.mainService.getStaffs().subscribe(
      resp => {
        console.log(resp)
        this.dataSource = resp;
      }
    )
  }

}
