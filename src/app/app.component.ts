import { Component } from '@angular/core';
import { AuthenticationHelper } from './helpers/authentication.helper';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  isLoggedIn: boolean = false;
  usuario: string = '';

  constructor(
    private authenticationHelper : AuthenticationHelper,
    private spinner : NgxSpinnerService
  ){
    //verificar se o usuário está autenticado
    if(authenticationHelper.getAuthData()){
      this.isLoggedIn = true;
      this.usuario = authenticationHelper.getAuthData().usuario;
    }
  }

  //método para fazer o logout do usuário
  logout(): void{
    if(window.confirm('deseja realmente sair do sistema?')){
      this.spinner.show();
      this.authenticationHelper.signOut();

      window.location.href = '/';
    }
  }
}
