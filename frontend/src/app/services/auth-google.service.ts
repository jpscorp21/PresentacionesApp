import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { PerfilService } from './perfil/perfil.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(
    public afAuth: AngularFireAuth,
    private perfilSrv: PerfilService
    // public slideSrv: SlideService,
    // public driveSrv: DriveService
  ) { }

  // Sign in with Google
  async GoogleAuth() {


    const configAuth = new auth.GoogleAuthProvider();

    configAuth.addScope('openid');
    configAuth.addScope('email');
    configAuth.addScope('profile');
    configAuth.addScope('https://www.googleapis.com/auth/drive');
    configAuth.addScope('https://www.googleapis.com/auth/drive.file');
    configAuth.addScope('https://www.googleapis.com/auth/presentations.readonly');
    configAuth.addScope('https://www.googleapis.com/auth/presentations');
    configAuth.addScope('https://www.googleapis.com/auth/drive.photos.readonly');

    return await this.AuthLogin(configAuth); // Le pasamos el proveedor de google
  }

  // Auth logic to run auth providers
  async AuthLogin(provider: any) {
    try {

      const resp = await this.afAuth.auth.signInWithPopup(provider);
      const credential: any = resp.credential;
      if (!credential) {
        throw new Error('Fallo de autenticacion');
      }
      await this.guardarPerfil(resp.user);
      // this.slideSrv.initialize();
      // this.driveSrv.initialize();
      return credential;

    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async guardarPerfil(user: any) {

    const res: any = await this.perfilSrv.guardarPerfil({
      usuario: user.displayName,
      thumbnail: user.photoURL,
      googleId: user.uid,
      email: user.email,
    }).toPromise();

    localStorage.setItem('userid', res._id);
    await this.perfilSrv.setNewPerfil();
  }
}
