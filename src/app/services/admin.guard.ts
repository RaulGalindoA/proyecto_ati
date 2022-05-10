import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {
  constructor( private localService: LocalService, private router: Router ){}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if ( this.localService.getJsonValue('token').user.nivel == "Admin" )   
    return true;
    else {
      this.router.navigate(['/home'])
      return false;
    }
  }
  
  canLoad( route: Route, segments: UrlSegment[]): Observable <boolean> | boolean {
    if ( this.localService.getJsonValue('token').user.nivel == "Admin" )   
    return true;
    else {
      this.router.navigate(['/home'])
      return false;
    }
  }
}
