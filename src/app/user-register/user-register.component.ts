import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  //atributos
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  //construtor da classe
  constructor(
    private httpClient: HttpClient, //injeção de dependência
    private spinnerService : NgxSpinnerService
  ) {

  }

  ngOnInit(): void {
  }

  //criando a estrutura do formulário
  formRegister = new FormGroup(
    {
      //campo do formulário
      nome: new FormControl('', [
        //regras de validação
        Validators.required
      ]),

      //campo do formulário
      email: new FormControl('', [
        //regras de validação
        Validators.required,
        Validators.email
      ]),

      //campo do formulário
      senha: new FormControl('', [
        //regras de validação
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),

    }
  );

  //função para acessar os campos e validações
  //do formulário na página HTML
  get form(): any {
    return this.formRegister.controls;
  }

  //função para realizar o cadastro do usuário
  onSubmit(): void {

    //loading
    this.spinnerService.show();

    this.limparMensagens();

    //requisição para a API..
    this.httpClient.post( //METHOD POST
      environment.apiUrl + '/register', //ENDPOINT
      this.formRegister.value //REQUEST DATA
    )
      .subscribe( //RESPOSTA (PROMISSE)
        (data: any) => { //SUCESSO
          this.spinnerService.hide();
          //mensagem obtida da API..
          this.mensagem_sucesso = data.message;
          //limpar os campos do formulário
          this.formRegister.reset();
        },
        e => { //ERRO
          this.spinnerService.hide();
          switch(e.status){
            case 422:
              this.mensagem_erro = e.error.message;
              break;

            default:
              this.mensagem_erro = "Ocorreu um erro no servidor. Por favor tente novamente.";
              break;            
          }
        }
      )
  }

  //função para limpar as mensagens
  limparMensagens() : void {
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';
  }

}
