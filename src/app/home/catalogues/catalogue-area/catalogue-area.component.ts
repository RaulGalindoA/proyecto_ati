import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MainService } from '../../../services/main.service';
import { Area } from '../../../interfaces/area/area';
import { DialogData } from '../../../interfaces/dialog-data';
import { DialogAddAreaComponent } from '../../../singleton/dialog-add-area/dialog-add-area.component';
import { DialogResponseComponent } from '../../../singleton/dialog-response/dialog-response.component';
import { DialogConfirmComponent } from '../../../singleton/dialog-confirm/dialog-confirm.component';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-catalogue-area',
  templateUrl: './catalogue-area.component.html',
  styleUrls: ['./catalogue-area.component.css']
})
export class CatalogueAreaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'acciones'];

  dataSource!: MatTableDataSource<Area>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private mainService: MainService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshAreas();
  }

  refreshAreas(){
    this.nombre = ''
    this.mainService.getAreas(1).subscribe(
      resp => {
        this.dataSource = new MatTableDataSource<Area>(resp);
        this.dataSource.paginator = this.paginator
        this.dataSource.paginator.firstPage()
      }
    )
  }


  options: AnimationOptions = {
    path: '/assets/lottie/notfound.json',
  }

  animationCreated(animationItem: AnimationItem): void {}

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
      data: `¿Está seguro de que desea eliminar el área <b>${area.nombre}</b>?` 
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if( result ){
        let dialogData: DialogData = {
          option: 1,
          message: ''
        }
        this.mainService.deleteArea( area.id! ).subscribe(
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

  nombre: string = '';

  activateFilters(){
    this.mainService.getAreas(1, this.nombre).subscribe(
      resp => {
        this.dataSource = new MatTableDataSource<Area>(resp);
        this.dataSource.paginator = this.paginator
      }
    )
  }

}
