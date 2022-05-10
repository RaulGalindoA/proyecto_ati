import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogAddOrEditInfraestructureComponent } from '../../singleton/dialog-add-or-edit-infraestructure/dialog-add-or-edit-infraestructure.component';
import { DialogResponseComponent } from '../../singleton/dialog-response/dialog-response.component';
import { DialogAddOrEditPersonalComponent } from '../../singleton/dialog-add-or-edit-personal/dialog-add-or-edit-personal.component';
import { MainService } from '../../services/main.service';
import { Staff } from '../../interfaces/staff/staff';
import { DialogData } from '../../interfaces/dialog-data';
import { DialogConfirmComponent } from '../../singleton/dialog-confirm/dialog-confirm.component';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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

  displayedColumns: string[] = [/* 'id', */ 'nombre', /* 'apellido_paterno', 'apellido_materno', */ 'direccion', 'telefono', 'mail', 'puesto', 'rfc', 'curp', 'num_staff', 'acciones'];

  dataSource!: MatTableDataSource<Staff>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  newPersonal() {
    let dialogData: DialogData = {
      option: 1,
      message: ''
    }
    const dialogRef = this.dialog.open(DialogAddOrEditPersonalComponent, {
      width: '650px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if ( result ) {
        if ( result.done == true ){
          dialogData.message = result.detail;
          this.dialog.open(DialogResponseComponent, {
            width: '500px',
            height: 'auto',
            data: dialogData
          });
          this.refreshPersonal();
        }
      }
      console.log('resultado')
      console.log(result);
    });
  }

  editPersonal( personal: Staff ){
    let dialogData: DialogData = {
      option: 1,
      message: ''
    }
    const dialogRef = this.dialog.open(DialogAddOrEditPersonalComponent, {
      width: '650px',
      height: 'auto',
      data: personal
    });
    dialogRef.afterClosed().subscribe((result) => {
      if ( result ) {
        if ( result.done == true ){
          dialogData.message = result.detail;
          this.dialog.open(DialogResponseComponent, {
            width: '500px',
            data: dialogData
          });
          this.refreshPersonal();
        }
      }
      console.log('resultado')
      console.log(result);
    });
  }

  refreshPersonal(){
    this.mainService.getStaffs(1).subscribe(
      resp => {
        console.log(resp)
        this.dataSource = new MatTableDataSource<Staff>(resp);
        this.dataSource.paginator = this.paginator
        this.dataSource.paginator.firstPage()
      }
    )
  }

  cleanFilters(){
    this.search = '';
    this.refreshPersonal();
  }

  deletePersonal(staff: Staff){
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: `¿Está seguro de que desea eliminar la marca <b>${staff.nombre}</b>?` 
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if( result ){
        let dialogData: DialogData = {
          option: 1,
          message: ''
        }
        this.mainService.deleteStaff( staff.id! ).subscribe(
          resp => {
            dialogData.message = resp.detail 
            this.dialog.open(DialogResponseComponent, {
              width: '500px',
              data: dialogData
            })
            this.refreshPersonal();
          }
        )
      }
    })
  }

  search: string = ''
  activateFilters(){
    this.mainService.getStaffs(1, this.search).subscribe(
      resp => {
        console.log(resp)
        this.dataSource = new MatTableDataSource<Staff>(resp);
        this.dataSource.paginator = this.paginator
        this.dataSource.paginator.firstPage()
      }
    )
  }

  options: AnimationOptions = {
    path: '/assets/lottie/notfound.json',
  }

  animationCreated(animationItem: AnimationItem): void {}

}
