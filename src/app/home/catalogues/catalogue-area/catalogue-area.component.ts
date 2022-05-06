import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MainService } from '../../../services/main.service';
import { Area } from '../../../interfaces/area/area';
import { DialogData } from '../../../interfaces/dialog-data';
import { DialogAddAreaComponent } from '../../../singleton/dialog-add-area/dialog-add-area.component';
import { DialogResponseComponent } from '../../../singleton/dialog-response/dialog-response.component';
import { DialogConfirmComponent } from '../../../singleton/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-catalogue-area',
  templateUrl: './catalogue-area.component.html',
  styleUrls: ['./catalogue-area.component.css']
})
export class CatalogueAreaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  dataSource!: Area[];

  constructor(private mainService: MainService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshAreas();
  }

  refreshAreas(){
    this.mainService.getAreas().subscribe(
      resp => {
        this.dataSource = resp;
      }
    )
  }

  newArea() {
    let dialogData: DialogData = {
      option: 1,
      message: ''
    }
    const dialogRef = this.dialog.open(DialogAddAreaComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if ( result ) {
        if ( result.done == true ){
          dialogData.message = result.detail;
          this.dialog.open(DialogResponseComponent, {
            width: '500px',
            data: dialogData
          });
          this.refreshAreas();
        }
      }
      console.log('resultado')
      console.log(result);
    });
  }

  editArea( area: Area ) {
    let dialogData: DialogData = {
      option: 1,
      message: ''
    }
    const dialogRef = this.dialog.open(DialogAddAreaComponent, {
      width: '500px',
      data: area
    });
    dialogRef.afterClosed().subscribe((result) => {
      if ( result ) {
        if ( result.done == true ){
          dialogData.message = result.detail;
          this.dialog.open(DialogResponseComponent, {
            width: '500px',
            data: dialogData
          });
          this.refreshAreas();
        }
      }
      console.log('resultado')
      console.log(result);
    });
  }

  deleteArea( area: Area ) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: `¿Está seguro de que desea eliminar la marca <b>${area.nombre}</b>?` 
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if( result ){
        let dialogData: DialogData = {
          option: 1,
          message: ''
        }
        this.mainService.deleteMarca( area.id! ).subscribe(
          resp => {
            dialogData.message = resp.detail 
            this.dialog.open(DialogResponseComponent, {
              width: '500px',
              data: dialogData
            })
            this.refreshAreas();
          }
        )
      }
    })
  }

}
