import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Equipo } from '../interfaces/equipo';
import { Categoria } from '../interfaces/categoria';
import { Staff } from '../interfaces/staff/staff';
import { ApiResponse } from '../interfaces/api-response';
import { Area } from '../interfaces/area/area';
import { Modelo } from '../interfaces/modelo/modelo';
import { Marca } from '../interfaces/marca';

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
    return this.http.get<Equipo[]>(this.baseUrl+'infra/view');
  }

  getEquiposByCategory(id: string):Observable<Equipo[]>{
    return this.http.get<Equipo[]>(this.baseUrl+'infra/cat/1');
  }

  getCategories():Observable<Equipo[]>{
    return this.http.get<Equipo[]>(this.baseUrl+'cat/view')
  }

  getCategory(id: string): Observable<Categoria>{
    return this.http.get<Categoria>(this.baseUrl+`cat/view/${id}`)
  }

  getAreas(): Observable<Area[]>{
    return this.http.get<Area[]>(this.baseUrl+`area/view`)
  }

  getArea(id: string): Observable<Area>{
    return this.http.get<Area>(this.baseUrl+`area/view/${id}`)
  }

  getMarcas(): Observable<Marca[]>{
    return this.http.get<Marca[]>(this.baseUrl+`marca/view`)
  }

  getMarca(id: string): Observable<Marca>{
    return this.http.get<Marca>(this.baseUrl+`marca/view/${id}`)
  }

  getModelos(): Observable<Modelo[]>{
    return this.http.get<Modelo[]>(this.baseUrl+`modelo/view`)
  }

  getModelo(id: string): Observable<Modelo>{
    return this.http.get<Modelo>(this.baseUrl+`modelo/view/${id}`)
  }

  getStaffs(): Observable<Staff[]>{
    return this.http.get<Staff[]>(this.baseUrl+`staff/view`)
  }

  getStaff(id: string): Observable<Staff>{
    return this.http.get<Staff>(this.baseUrl+`modelo/view/${id}`)
  }

  addMarca( marca: Marca ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+'marca/new', marca)
  }

  addArea( area: Area ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+'area/new', area)
  }

  addModelo( modelo: Modelo ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+'modelo/new', modelo)
  }

  addCategoria( categoria: Categoria ): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+'cat/new', categoria)
  }

  deleteMarca( id: number ): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl+`marca/del/${id}`)
  }

  deleteArea( id: number ): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl+`area/del/${id}`)
  }
  
  deleteModelo( id: number ): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl+`modelo/del/${id}`)
  }

  deleteCategoria( id: number ): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl+`cat/del/${id}`)
  }

  editMarca( marca: Marca ): Observable<ApiResponse> {
    let id = marca.id
    delete marca.id;
    marca.active = true;
    return this.http.put<ApiResponse>(this.baseUrl+`marca/edit/${id}`, marca)
  }

  editArea( area: Area ): Observable<ApiResponse> {
    let id = area.id
    delete area.id;
    area.active = true;
    return this.http.put<ApiResponse>(this.baseUrl+`area/edit/${id}`, area)
  }

  editModelo( modelo: Modelo ): Observable<ApiResponse> {
    let id = modelo.id
    delete modelo.id;
    modelo.active = true;
    return this.http.put<ApiResponse>(this.baseUrl+`modelo/edit/${id}`, modelo)
  }

  editCategoria( categoria: Categoria ): Observable<ApiResponse> {
    let id = categoria.id
    delete categoria.id;
    categoria.active = true;
    return this.http.put<ApiResponse>(this.baseUrl+`cat/edit/${id}`, categoria)
  }

}
