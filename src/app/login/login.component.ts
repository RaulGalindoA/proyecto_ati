import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/usuario';
import { DialogData } from '../interfaces/dialog-data';
import { MainService } from '../services/main.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogResponseComponent } from '../singleton/dialog-response/dialog-response.component';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  
  usuario: Usuario = {
    mail: '',
    password: ''
  }

  constructor( private router: Router, private mainService: MainService, public dialog: MatDialog, private localService: LocalService ) { }

  ngOnInit(): void {
    if( this.localService.getJsonValue('token') ){
      this.router.navigate(['/home'])
    }
  }

  login(){
    let dialogData: DialogData = {
      option: 1,
      message: ''
    }
    console.log(this.usuario)
    this.mainService.login( this.usuario ).subscribe(
      resp=> {
        console.log(resp);
        if ( resp.done ){
          this.localService.setJsonValue('token', resp);
          let token =this.localService.getJsonValue('token');
          console.log(token)
          this.router.navigate(['home']);
        } else {
          dialogData.option = 2;
          dialogData.message = resp.detail
          this.dialog.open(DialogResponseComponent, {
            width: '500px',
            data: dialogData
          });
        }
      }
    )
  }

}
