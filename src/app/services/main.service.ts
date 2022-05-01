import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Equipo } from '../interfaces/equipo';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  baseUrl: string = environment.url;

  constructor( private http: HttpClient ) { }

  testService():Observable<any>{
    return this.http.get<any>(this.baseUrl+'infra/view');
  }

  getEquipos():Observable<Equipo[]>{
    return this.http.get<Equipo[]>(this.baseUrl+'infra/view')
  }

}
