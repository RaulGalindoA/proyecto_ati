import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Modelo } from '../../../interfaces/modelo/modelo';
import { MainService } from '../../../services/main.service';
import { DialogData } from '../../../interfaces/dialog-data';
import { DialogAddModeloComponent } from '../../../singleton/dialog-add-modelo/dialog-add-modelo.component';
import { DialogResponseComponent } from '../../../singleton/dialog-response/dialog-response.component';
import { DialogConfirmComponent } from '../../../singleton/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-catalogue-modelo',
  templateUrl: './catalogue-modelo.component.html',
  styleUrls: ['./catalogue-modelo.component.css']
})
export class CatalogueModeloComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  dataSource!: Modelo[];

  constructor(private mainService: MainService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.refreshModelos()
  }

  refreshModelos(){
    this.mainService.getModelos().subscribe((resp) => {
      this.dataSource = resp;
      console.log(resp)
    });
  }

  newMarca() {
    let dialogData: DialogData = {
      option: 1,
      message: ''
    }
    const dialogRef = this.dialog.open(DialogAddModeloComponent, {
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
          this.refreshModelos();
        }
      }
      console.log('resultado')
      console.log(result);
    });
  }

  editModelo( modelo: Modelo ) {
    let dialogData: DialogData = {
      option: 1,
      message: ''
    }
    const dialogRef = this.dialog.open(DialogAddModeloComponent, {
      width: '500px',
      data: modelo
    });
    dialogRef.afterClosed().subscribe((result) => {
      if ( result ) {
        if ( result.done == true ){
          dialogData.message = result.detail;
          this.dialog.open(DialogResponseComponent, {
            width: '500px',
            data: dialogData
          });
          this.refreshModelos();
        }
      }
      console.log('resultado')
      console.log(result);
    });
  }

  deleteModelo( modelo: Modelo ) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: `¿Está seguro de que desea eliminar la marca <b>${modelo.nombre}</b>?` 
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if( result ){
        let dialogData: DialogData = {
          option: 1,
          message: ''
        }
        this.mainService.deleteModelo( modelo.id! ).subscribe(
          resp => {
            dialogData.message = resp.detail 
            this.dialog.open(DialogResponseComponent, {
              width: '500px',
              data: dialogData
            })
            this.refreshModelos();
          }
        )
      }
    })
  }
}
