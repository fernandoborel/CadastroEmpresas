import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-empresas-edicao',
  templateUrl: './empresas-edicao.component.html',
  styleUrls: ['./empresas-edicao.component.css']
})

export class EmpresasEdicaoComponent implements OnInit{

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
){}

  ngOnInit(): void {
    this.spinner.show();

    let idEmpresa = this.activatedRoute.snapshot.paramMap.get('idEmpresa') as string;

    this.httpClient.get(environment.apiUrl + "/Empresas/" + idEmpresa)
      .subscribe(
        (res: any) => {
          this.formEdicao.patchValue(res);
          this.spinner.hide();
        }
      )

  }

  formEdicao = new FormGroup({
    idEmpresa: new FormControl('', []),
    nomeFantasia: new FormControl('', [Validators.required]),
    razaoSocial: new FormControl('', [Validators.required]),
    cnpj: new FormControl('', [Validators.required])
  });

  get form(): any {
    return this.formEdicao.controls;
  }

  onSubmit(): void {

    this.limparMensagens();
    this.spinner.show();

    this.httpClient.put(environment.apiUrl + "/Empresas", this.formEdicao.value)
      .subscribe(
        {
          next: (res: any) => {
            this.mensagem_sucesso = `Empresa ${res.nomeFantasia}, atualizada com sucesso.`;
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

  limparMensagens(): void {
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';
  }

}
