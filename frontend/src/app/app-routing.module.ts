import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserIdGuard } from './guards/userid.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full'
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
    canActivateChild: [UserIdGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'documentacion',
    loadChildren: () => import('./documentacion/documentacion.module').then((m) => m.DocumentacionModule),
    canActivateChild: [UserIdGuard]
  },
  {
    path: 'imagenes',
    loadChildren: () => import('./imagenes/imagenes.module').then((m) => m.ImagenesModule),
    canActivateChild: [UserIdGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
