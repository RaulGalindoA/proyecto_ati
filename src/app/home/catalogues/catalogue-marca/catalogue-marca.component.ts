import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { Marca } from '../../../interfaces/marca';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddMarcaComponent } from '../../../singleton/dialog-add-marca/dialog-add-marca.component';
import { DialogResponseComponent } from '../../../singleton/dialog-response/dialog-response.component';
import { DialogData } from '../../../interfaces/dialog-data';
import { DialogConfirmComponent } from '../../../singleton/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-catalogue-marca',
  templateUrl: './catalogue-marca.component.html',
  styleUrls: ['./catalogue-marca.component.css'],
})
export class CatalogueMarcaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  dataSource!: Marca[];

  constructor(private mainService: MainService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.refreshMarcas()
  }

  refreshMarcas(){
    this.mainService.getMarcas().subscribe((resp) => {
      this.dataSource = resp;
      console.log(resp)
    });
  }

  newMarca() {
    let dialogData: DialogData = {
      option: 1,
      message: ''
    }
    const dialogRef = this.dialog.open(DialogAddMarcaComponent, {
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
          this.refreshMarcas();
        }
      }
      console.log('resultado')
      console.log(result);
    });
  }

  editMarca( marca: Marca ) {
    let dialogData: DialogData = {
      option: 1,
      message: ''
    }
    const dialogRef = this.dialog.open(DialogAddMarcaComponent, {
      width: '500px',
      data: marca
    });
    dialogRef.afterClosed().subscribe((result) => {
      if ( result ) {
        if ( result.done == true ){
          dialogData.message = result.detail;
          this.dialog.open(DialogResponseComponent, {
            width: '500px',
            data: dialogData
          });
          this.refreshMarcas();
        }
      }
      console.log('resultado')
      console.log(result);
    });
  }

  deleteMarca( marca: Marca ) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: `¿Está seguro de que desea eliminar la marca <b>${marca.nombre}</b>?` 
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if( result ){
        let dialogData: DialogData = {
          option: 1,
          message: ''
        }
        this.mainService.deleteMarca( marca.id! ).subscribe(
          resp => {
            dialogData.message = resp.detail 
            this.dialog.open(DialogResponseComponent, {
              width: '500px',
              data: dialogData
            })
            this.refreshMarcas();
          }
        )
      }
    })
  }
}
