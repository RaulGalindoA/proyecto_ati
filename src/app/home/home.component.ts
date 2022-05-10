import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private localService: LocalService) { }

  nombre: string = '';
  tipo: string = '';
  admin: boolean = false;

  ngOnInit(): void {
    let token = this.localService.getJsonValue('token');
    this.tipo = token.user.nivel;
    if ( this.tipo == 'Admin' ) this.admin = true;
    else this.admin = false;
    this.nombre = token.user.user;
  }

  cierraSesion(){
    this.localService.clearToken();
    this.router.navigate(['/']);

  }

}
