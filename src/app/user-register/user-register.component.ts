import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  constructor(
    private httpClient: HttpClient //injeção de dependência
  ) {}

  ngOnInit(): void {}

  //form
  formRegister = new FormGroup({
    //campos
    nome: new FormControl('', [
      //validação
      Validators.required,
    ]),

    //campos
    email: new FormControl('', [
      //validação
      Validators.required,
      Validators.email,
    ]),

    //campos
    senha: new FormControl('', [
      //validação
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });

  //função para acessar os campos e validações
  get form(): any {
    return this.formRegister.controls;
  }

  //função para realizar o cadastro do usuário
  onSubmit(): void {
    //requisição para a API..
    this.httpClient
      .post(
        'http://localhost:5188/api/Register', //ENDPOINT
        this.formRegister.value //REQUEST DATA
      )
      .subscribe(
        //RESPONSE
        (data: any) => {
          alert(data.message);
        }
      );
  }
}
