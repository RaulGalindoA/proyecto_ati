import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria } from '../../../interfaces/categoria';
import { MainService } from '../../../services/main.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../../../interfaces/dialog-data';
import { DialogAddCategoriaComponent } from '../../../singleton/dialog-add-categoria/dialog-add-categoria.component';
import { DialogResponseComponent } from '../../../singleton/dialog-response/dialog-response.component';
import { DialogConfirmComponent } from '../../../singleton/dialog-confirm/dialog-confirm.component';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-catalogue-categoria',
  templateUrl: './catalogue-categoria.component.html',
  styleUrls: ['./catalogue-categoria.component.css']
})
export class CatalogueCategoriaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  dataSource!: MatTableDataSource<Categoria>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private mainService: MainService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshCategorias();
  }

  refreshCategorias(){
    this.nombre = '';
    this.mainService.getCategories(1).subscribe(
      resp => {
        this.dataSource = new MatTableDataSource<Categoria>(resp);
        this.dataSource.paginator = this.paginator
        this.dataSource.paginator.firstPage();
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

  nombre: string = '';

  activateFilters(){
    this.mainService.getCategories(1, this.nombre).subscribe(
      resp => {
        this.dataSource = new MatTableDataSource<Categoria>(resp);
        this.dataSource.paginator = this.paginator
      }
    )
  }

  options: AnimationOptions = {
    path: '/assets/lottie/notfound.json',
  }

  animationCreated(animationItem: AnimationItem): void {}

}
