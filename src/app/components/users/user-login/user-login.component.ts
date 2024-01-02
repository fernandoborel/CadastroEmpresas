import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationHelper } from 'src/app/helpers/authentication.helper';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  //inicialização por injeção de dependência
  constructor(
    private httpClient: HttpClient,
    private spinnerService: NgxSpinnerService,
    private authenticationHelper: AuthenticationHelper
  ) {
    if (this.authenticationHelper.getAuthData()) {
      window.location.href = '/empresas-consulta';
    }
  }

  ngOnInit(): void {
  }

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required])
  });

  get form(): any {
    return this.formLogin.controls;
  }

  onSubmit(): void {

    this.spinnerService.show();

    this.limparMensagens();

    this.httpClient.post(environment.apiUrl + "/login", this.formLogin.value)
      .subscribe(
        {
          next: (data: any) => {

            this.formLogin.reset();

            this.authenticationHelper.signIn(data);

            window.location.href = '/empresas-consulta';
          },
          error: e => {
            this.spinnerService.hide();

            switch (e.status) {
              case 401:
                this.mensagem_erro = e.error.message;
                break;

              default:
                this.mensagem_erro = "Ocorreu um erro ao autenticar o usuário, tente novamente.";
                break;
            }
          }
        }
      );
  }

  limparMensagens(): void {
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';
  }

}
