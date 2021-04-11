import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PresentacionesNuevoFormComponent } from '../pages/presentaciones/components/presentaciones-nuevo-form/presentaciones-nuevo-form.component';


// Consider using this interface for all CanDeactivate guards,
// and have your components implement this interface, too.
//
//   e.g. export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
//
// export interface CanComponentDeactivate {
// canDeactivate: () => any;
// }

@Injectable({providedIn: 'root'})
export class SalirFormGuard implements CanDeactivate<PresentacionesNuevoFormComponent> {
  canDeactivate(
    component: PresentacionesNuevoFormComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (window.confirm('Estas seguro?')) {
      return true;
    }
    return false;
  }
}
