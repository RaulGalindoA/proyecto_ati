import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MainService } from '../../services/main.service';
import { Usuario } from '../../interfaces/usuario';
import { DialogData } from '../../interfaces/dialog-data';
import { DialogResponseComponent } from '../../singleton/dialog-response/dialog-response.component';
import { DialogAddUserComponent } from '../../singleton/dialog-add-user/dialog-add-user.component';
import { DialogConfirmComponent } from '../../singleton/dialog-confirm/dialog-confirm.component';
import { DialogEditPasswordComponent } from '../../singleton/dialog-edit-password/dialog-edit-password.component';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private mainService: MainService) { }

  ngOnInit(): void {
    this.refreshUsers()
  }

  displayedColumns: string[] = ['id', 'usuario', 'mail', 'nivel', 'acciones'];

  dataSource!: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  newUser() {
    let dialogData: DialogData = {
      option: 1,
      message: ''
    }
    const dialogRef = this.dialog.open(DialogAddUserComponent, {
      width: '650px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if ( result ) {
        if ( result.done == true ){
          dialogData.message = result.detail;
          this.dialog.open(DialogResponseComponent, {
            width: '500px',
            data: dialogData
          });
          this.refreshUsers();
        } else {
          dialogData.message = result.detail.mail[0];
          dialogData.option = 2
          this.dialog.open(DialogResponseComponent, {
            width: '500px',
            data: dialogData
          });
        }
      } 
      console.log('resultado')
      console.log(result);
    });
  }

  deleteUser(user: Usuario){
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        width: '500px',
        data: `¿Está seguro de que desea eliminar el usuario <b>${user.user}</b>?` 
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result)
        if( result ){
          let dialogData: DialogData = {
            option: 1,
            message: ''
          }
          this.mainService.deleteUser( user.id! ).subscribe(
            resp => {
              dialogData.message = resp.detail 
              this.dialog.open(DialogResponseComponent, {
                width: '500px',
                data: dialogData
              })
              this.refreshUsers();
            }
          )
        }
      })
  }

  editUser( usuario: Usuario ){
    let dialogData: DialogData = {
      option: 1,
      message: ''
    }
    const dialogRef = this.dialog.open(DialogAddUserComponent, {
      width: '650px',
      data: usuario
    });
    dialogRef.afterClosed().subscribe((result) => {
      if ( result ) {
        console.log('resultado del dialogo')
        console.log(result)
        if ( result.done == true ){
          dialogData.message = result.detail;
          this.dialog.open(DialogResponseComponent, {
            width: '500px',
            data: dialogData
          });
          this.refreshUsers();
        } else {
          dialogData.message = result.detail.mail[0];
          dialogData.option = 2
          this.dialog.open(DialogResponseComponent, {
            width: '500px',
            data: dialogData
          });
        }
        
      } 
      console.log('resultado')
      console.log(result);
    });
  }

  refreshUsers(){
    this.mainService.getUsers(1).subscribe(
      resp => {
        console.log(resp)
        this.dataSource = new MatTableDataSource<Usuario>(resp);
        this.dataSource.paginator = this.paginator
        this.dataSource.paginator.firstPage()
      }
    )
  }

  cleanFields(){
    this.refreshUsers();
    this.nivel = '';
    this.mail = '';
  }

  nivel: string = '';
  mail:    string = '';

  niveles = ['Admin', 'Staff'];

  activateFilters(){
    this.mainService.getUsers(1, this.nivel, this.mail).subscribe(
      resp => {
        this.dataSource = new MatTableDataSource<Usuario>(resp);
        this.dataSource.paginator = this.paginator
        this.dataSource.paginator.firstPage()
      }
    )
  }

  changePass(usuario: Usuario){
    let dialogData: DialogData = {
      option: 1,
      message: ''
    }
    const dialogRef = this.dialog.open(DialogEditPasswordComponent, {
      width: '650px',
      data: usuario
    });
    dialogRef.afterClosed().subscribe((result) => {
      if ( result ) {
        if ( result.done == true ){
          dialogData.message = result.detail;
          this.dialog.open(DialogResponseComponent, {
            width: '500px',
            data: dialogData
          });
          this.refreshUsers();
        }
      }
      console.log('resultado')
      console.log(result);
    });
  }

  options: AnimationOptions = {
    path: '/assets/lottie/notfound.json',
  }

  animationCreated(animationItem: AnimationItem): void {}

}
