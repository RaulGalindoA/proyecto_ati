import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Equipo } from '../interfaces/equipo';
import { Categoria } from '../interfaces/categoria';
import { Staff } from '../interfaces/staff/staff';
import { ApiResponse } from '../interfaces/api-response';
import { Area } from '../interfaces/area/area';
import { Modelo } from '../interfaces/modelo/modelo';
import { Marca } from '../interfaces/marca';
import { Usuario } from '../interfaces/usuario';
import { Tipo } from '../interfaces/tipo/tipo';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  baseUrl: string = environment.url;

  constructor(private http: HttpClient) {}

  testService(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'infra/view');
  }

  getEquipos(
    pageNumber: number,
    modelo?: number,
    marca?: number,
    tipo?: number,
    staff?: number,
    area?: number,
    nombre?: string,
    nserie?: string,
    start?: string,
    end?: string
  ): Observable<Equipo[]> {
    console.log(nombre)
    let params = new HttpParams().set('pageNumber', '');
    if( modelo && modelo != 0  ) params = params.set('modelo', modelo )
    if( marca && marca != 0  ) params = params.set('marca', marca )
    if( tipo && tipo != 0  ) params = params.set('tipo', tipo )
    if( staff && staff != 0  ) params = params.set('staff', staff )
    if( area && area != 0  ) params = params.set('area', area )
    if( nombre && nombre.trim() != ''  ) params = params.set('nombre', nombre )
    if( nserie && nserie.trim() != ''  ) params = params.set('num_serie', nserie )
    if( start && start.trim() != ''  ) params = params.set('start_date', start )
    if( end && end.trim() != ''  ) params = params.set('end_date', end )

    return this.http.get<Equipo[]>(this.baseUrl + 'infra/view', {params});
  }
  getEquiposByStaff( 
    user: number,
    modelo?: number,
    marca?: number,
    tipo?: number,
    area?: number,
    nombre?: string,
    nserie?: string,
    start?: string,
    end?: string,
    ): Observable<Equipo[]> {
    let params = new HttpParams().set('user', user);
    if( modelo && modelo != 0  ) params = params.set('modelo', modelo )
    if( marca && marca != 0  ) params = params.set('marca', marca )
    if( tipo && tipo != 0  ) params = params.set('tipo', tipo )
    if( area && area != 0  ) params = params.set('area', area )
    if( nombre && nombre.trim() != ''  ) params = params.set('nombre', nombre )
    if( nserie && nserie.trim() != ''  ) params = params.set('num_serie', nserie )
    if( start && start.trim() != ''  ) params = params.set('start_date', start )
    if( end && end.trim() != ''  ) params = params.set('end_date', end )
    return this.http.get<Equipo[]>(this.baseUrl + `infra/staff/view`, {params});
  }

  getEquiposByCategory(id: string): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.baseUrl + 'infra/cat/1');
  }


  getCategories(pageNumber: number, nombre?: string): Observable<Tipo[]> {
    let params = new HttpParams().set('pageNumber', pageNumber);
    if( nombre && nombre != ''  ) params = params.set('nombre', nombre )
    return this.http.get<Tipo[]>(this.baseUrl + 'cat/view', {params});
  }

  getCategory(id: string): Observable<Categoria> {
    return this.http.get<Categoria>(this.baseUrl + `cat/view/${id}`);
  }

  getAreas(pageNumber: number, nombre?: string): Observable<Area[]> {
    let params = new HttpParams().set('pageNumber', pageNumber);
    if( nombre && nombre != ''  ) params = params.set('nombre', nombre )
    return this.http.get<Area[]>(this.baseUrl + `area/view`, {params});
  }

  getArea(id: string): Observable<Area> {
    return this.http.get<Area>(this.baseUrl + `area/view/${id}`);
  }

  getMarcas(pageNumber: number, nombre?: string): Observable<Marca[]> {
    let params = new HttpParams().set('pageNumber', pageNumber);
    if( nombre && nombre != ''  ) params = params.set('nombre', nombre )
    return this.http.get<Marca[]>(this.baseUrl + `marca/view`, {params});
  }

  getMarca(id: string): Observable<Marca> {
    return this.http.get<Marca>(this.baseUrl + `marca/view/${id}`);
  }

  getModelos(pageNumber: number, nombre?: string, id?: number): Observable<Modelo[]> {
    let params = new HttpParams().set('pageNumber', pageNumber);
    if( nombre && nombre != ''  ) params = params.set('nombre', nombre )
    if( id     && id != 0 )       params = params.set('marca', id)
    return this.http.get<Modelo[]>(this.baseUrl + `modelo/view`, {params});
  }

  getModelo(id: string): Observable<Modelo> {
    return this.http.get<Modelo>(this.baseUrl + `modelo/view/${id}`);
  }

  getStaffs(pageNumber: number, search?: string): Observable<Staff[]> {
    let params = new HttpParams().set('pageNumber', pageNumber);
    if( search ) params = params.set('search', search )

    return this.http.get<Staff[]>(this.baseUrl + `staff/view`, {params});
  }

  getUsers( pageNumber: number, nivel?: string, mail?: string, unused?: string ): Observable<Usuario[]> {
    let params = new HttpParams().set('pageNumber', pageNumber);
    if( unused ) params = params.set('unused', '1' )
    if( mail   ) params = params.set('mail', mail )
    if( nivel  ) params = params.set('nivel', nivel )

    return this.http.get<Usuario[]>(this.baseUrl + `user/view`, {params});
  }

  getStaff(id: string): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.baseUrl + `staff/view/${id}`);
  }


  addMarca(marca: Marca): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'marca/new', marca);
  }

  addArea(area: Area): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'area/new', area);
  }

  addModelo(modelo: Modelo): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'modelo/new', modelo);
  }

  addCategoria(categoria: Categoria): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'cat/new', categoria);
  }

  addStaff(staff: Staff): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'staff/new', staff);
  }

  addEquipo(equipo: Equipo): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'infra/new', equipo);
  }

  deleteMarca(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + `marca/del/${id}`);
  }

  deleteArea(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + `area/del/${id}`);
  }

  deleteModelo(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + `modelo/del/${id}`);
  }

  deleteCategoria(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + `cat/del/${id}`);
  }

  deleteStaff(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + `staff/del/${id}`);
  }

  deleteUser( id: number ): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + `user/del/${id}`);
  }

  deleteEquipo( id: number ): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + `infra/del/${id}`);
  }

  deletePersonal( id: number ): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + `staff/del/${id}`);
  }



  editMarca(marca: Marca): Observable<ApiResponse> {
    let id = marca.id;
    delete marca.id;
    marca.active = true;
    return this.http.put<ApiResponse>(this.baseUrl + `marca/edit/${id}`, marca);
  }

  editArea(area: Area): Observable<ApiResponse> {
    let id = area.id;
    delete area.id;
    area.active = true;
    console.log('area')
    return this.http.put<ApiResponse>(this.baseUrl + `area/edit/${id}`, area);
  }

  editModelo(modelo: Modelo): Observable<ApiResponse> {
    let id = modelo.id;
    delete modelo.id;
    modelo.active = true;
    return this.http.put<ApiResponse>(
      this.baseUrl + `modelo/edit/${id}`,
      modelo
    );
  }

  editCategoria(categoria: Categoria): Observable<ApiResponse> {
    let id = categoria.id;
    delete categoria.id;
    categoria.active = true;
    return this.http.put<ApiResponse>(
      this.baseUrl + `cat/edit/${id}`,
      categoria
    );
  }

  editStaff(staff: Staff): Observable<ApiResponse> {
    let id = staff.id;
    delete staff.id;
    staff.active = true;
    return this.http.put<ApiResponse>(this.baseUrl + `staff/edit/${id}`, staff);
  }

  editEquipo(equipo: Equipo): Observable<ApiResponse> {
    let id = equipo.id;
    delete equipo.id;
    equipo.active = true;
    return this.http.put<ApiResponse>(
      this.baseUrl + `infra/edit/${id}`,
      equipo
    );
  }

  editUser( usuario: Usuario ){
    let id = usuario.id;
    delete usuario.id;
    usuario.active = true;
    return this.http.put<ApiResponse>(
      this.baseUrl + `user/edit/${id}`, usuario
    );
  }

  editPassword( id: number, pass: string ): Observable<ApiResponse>{
    let obj = { password: pass }
    return this.http.put<ApiResponse>(this.baseUrl + `user/edit/pass/${id}`, obj);
  }

  editOwnEquipo( equipo: Equipo ): Observable<ApiResponse>{
    let id = equipo.id;
    delete equipo.id;
    return this.http.put<ApiResponse>(this.baseUrl + `infra/staff/edit/${id}`, equipo);
  }

  getStaffByUserId( id:string ): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.baseUrl + `staff/user/${id}`);
  }

  register(usuario: Usuario): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + `register`, usuario);
  }

  login(usuario: Usuario): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + `login`, usuario);
  }
}
