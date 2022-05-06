import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../interfaces/categoria';
import { MainService } from '../../../services/main.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../../../interfaces/dialog-data';
import { DialogAddCategoriaComponent } from '../../../singleton/dialog-add-categoria/dialog-add-categoria.component';
import { DialogResponseComponent } from '../../../singleton/dialog-response/dialog-response.component';
import { DialogConfirmComponent } from '../../../singleton/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-catalogue-categoria',
  templateUrl: './catalogue-categoria.component.html',
  styleUrls: ['./catalogue-categoria.component.css']
})
export class CatalogueCategoriaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  dataSource!: Categoria[];

  constructor(private mainService: MainService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshCategorias();
  }

  refreshCategorias(){
    this.mainService.getCategories().subscribe(
      resp => {
        this.dataSource = resp;
      }
    )
  }

  newCategoria() {
    let dialogData: DialogData = {
      option: 1,
      message: ''
    }
    const dialogRef = this.dialog.open(DialogAddCategoriaComponent, {
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
          this.refreshCategorias();
        }
      }
      console.log('resultado')
      console.log(result);
    });
  }

  editCategoria( categoria: Categoria ) {
    let dialogData: DialogData = {
      option: 1,
      message: ''
    }
    const dialogRef = this.dialog.open(DialogAddCategoriaComponent, {
      width: '500px',
      data: categoria
    });
    dialogRef.afterClosed().subscribe((result) => {
      if ( result ) {
        if ( result.done == true ){
          dialogData.message = result.detail;
          this.dialog.open(DialogResponseComponent, {
            width: '500px',
            data: dialogData
          });
          this.refreshCategorias();
        }
      }
      console.log('resultado')
      console.log(result);
    });
  }

  deleteCategoria( categoria: Categoria ) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: `¿Está seguro de que desea eliminar la categoría <b>${categoria.nombre}</b>?` 
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if( result ){
        let dialogData: DialogData = {
          option: 1,
          message: ''
        }
        this.mainService.deleteCategoria( categoria.id! ).subscribe(
          resp => {
            dialogData.message = resp.detail 
            this.dialog.open(DialogResponseComponent, {
              width: '500px',
              data: dialogData
            })
            this.refreshCategorias();
          }
        )
      }
    })
  }

}
