import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private httpClient: HttpClient //injeção de dependência
  ) {}

  //formulário
  formRegister = new FormGroup({
    //campo do formulário
    nome: new FormControl('', [
      //regras de validação
      Validators.required,
    ]),

    //campo do formulário
    email: new FormControl('', [
      //regras de validação
      Validators.required,
      Validators.email,
    ]),

    //campo do formulário
    senha: new FormControl('', [
      //regras de validação
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });

  //função para acessar os campos e validações
  //do formulário na página HTML
  get form(): any {
    return this.formRegister.controls;
  }

  //função para realizar o cadastro do usuário
  onSubmit(): void {
    //requisição para a API..
    this.httpClient
      .post(
        //METHOD POST
        'http://localhost:5188/api/Register', //ENDPOINT
        this.formRegister.value //REQUEST DATA
      )
      .subscribe(
        //RESPOSTA
        (data: any) => {
          //mensagem obtida da API..
          alert(data.message);
        }
      );
  }
}
