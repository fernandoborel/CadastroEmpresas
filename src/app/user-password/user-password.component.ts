import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent {

  mensagem_sucesso : string = '';
  mensagem_erro : string = '';

  constructor(
    private httpClient : HttpClient,
    private spinnerService : NgxSpinnerService
  ) {}
  
  ngOnInit(): void {
  }

  formPassword = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  get form(): any {
    return this.formPassword.controls;
  }


  onSubmit(): void{
    this.spinnerService.show();

    this.httpClient.post(environment.apiUrl + "/PasswordRecover", this.formPassword.value)
    .subscribe(
      (result:any) => {
        this.spinnerService.hide();

        this.mensagem_sucesso = result.message;
        this.formPassword.reset();
      },
      e => {
        this.spinnerService.hide();

        switch(e.status){
          case 422:
            this.mensagem_erro = e.error.message;
            break;
          default:
            this.mensagem_erro = "Ocorreu um erro ao autenticar o usuário, tente novamente.";
            break;
        }
      }
    )
  }

  limparMensagens(): void{
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';
  }
}
