import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-empresas-cadastro',
  templateUrl: './empresas-cadastro.component.html',
  styleUrls: ['./empresas-cadastro.component.css']
})
export class EmpresasCadastroComponent {

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ){}

  formCadastro = new FormGroup({
    nomeFantasia: new FormControl('', [Validators.required]),
    razaoSocial: new FormControl('', [Validators.required]),
    cnpj: new FormControl('', [Validators.required])
  });

  get form(): any{
    return this.formCadastro.controls;
  }

  ngOnInit(): void{}

  onSubmit(): void {

    this.limparMensagens();
    this.spinner.show();

    this.httpClient.post(environment.apiUrl + "/Empresas", this.formCadastro.value)
      .subscribe(
        {
          next: (res: any) => {
            this.mensagem_sucesso = `Empresa ${res.nomeFantasia}, cadastrada com sucesso.`;
            this.formCadastro.reset();
            this.spinner.hide();
          }, 
          error: (e) => {
            switch(e.status){
              case 422:
                this.mensagem_erro = e.error.message;
                break;
              default:
                this.mensagem_erro = "Ocorreu um erro."
                break;
            }
            this.spinner.hide();
          }
        }
      )
  }

  limparMensagens(): void{
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';
  }
}
