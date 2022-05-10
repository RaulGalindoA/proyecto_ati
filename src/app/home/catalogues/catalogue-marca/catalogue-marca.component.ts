import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { Marca } from '../../../interfaces/marca';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddMarcaComponent } from '../../../singleton/dialog-add-marca/dialog-add-marca.component';
import { DialogResponseComponent } from '../../../singleton/dialog-response/dialog-response.component';
import { DialogData } from '../../../interfaces/dialog-data';
import { DialogConfirmComponent } from '../../../singleton/dialog-confirm/dialog-confirm.component';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-catalogue-marca',
  templateUrl: './catalogue-marca.component.html',
  styleUrls: ['./catalogue-marca.component.css'],
})
export class CatalogueMarcaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  dataSource!: MatTableDataSource<Marca>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private mainService: MainService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.refreshMarcas()
  }

  refreshMarcas(){
    this.mainService.getMarcas(1).subscribe((resp) => {
      this.dataSource = new MatTableDataSource<Marca>(resp);
      this.dataSource.paginator = this.paginator
      this.dataSource.paginator.firstPage();
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

  nombre: string = '';

  activateFilters(){
    console.log(this.nombre);
    
    this.mainService.getMarcas(1, this.nombre).subscribe(
      resp => {
        this.dataSource = new MatTableDataSource<Marca>(resp);
        this.dataSource.paginator = this.paginator
      }
    )
  }

  options: AnimationOptions = {
    path: '/assets/lottie/notfound.json',
  }

  animationCreated(animationItem: AnimationItem): void {}
}
