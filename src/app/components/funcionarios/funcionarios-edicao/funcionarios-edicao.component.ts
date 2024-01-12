import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-funcionarios-edicao',
  templateUrl: './funcionarios-edicao.component.html',
  styleUrls: ['./funcionarios-edicao.component.css']
})
export class FuncionariosEdicaoComponent implements OnInit {

  empresas: any[] = [];

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {

    this.spinner.show();
    this.httpClient.get(environment.apiUrl + "/Empresas")
      .subscribe(
        (res) => {
          this.empresas = res as any[];
          this.spinner.hide();
        }
      )

    let idFuncionario = this.activatedRoute.snapshot.paramMap.get('idFuncionario') as string;

    this.spinner.show();
    this.httpClient.get(environment.apiUrl + "/Funcionarios/" + idFuncionario)
      .subscribe(
        (res: any) => {
          
          this.formEdicao.patchValue(res);

          this.formEdicao.controls['dataAdmissao']
            .setValue(formatDate(res.dataAdmissao as Date, 'yyyy-MM-dd', 'en'));

          this.formEdicao.controls['idEmpresa'].setValue(res.empresa.idEmpresa);

          this.spinner.hide();
        }
      )
  }

  formEdicao = new FormGroup({
    idFuncionario: new FormControl('', []),
    nome: new FormControl('', [Validators.required]),
    matricula: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    dataAdmissao: new FormControl('', [Validators.required]),
    idEmpresa: new FormControl('', [Validators.required])
  });

  get form(): any {
    return this.formEdicao.controls;
  }

  onSubmit(): void {

    this.limparMensagens();
    this.spinner.show();

    this.httpClient.put(environment.apiUrl + "/Funcionarios", this.formEdicao.value)
      .subscribe(
        {
          next: (res: any) => {
            this.mensagem_sucesso = `Funcionário ${res.nome}, atualizado com sucesso.`;
            this.spinner.hide();
          },
          error: (e) => {
            switch (e.status) {
              case 422:
                this.mensagem_erro = e.error.message;
                break;
              default:
                this.mensagem_erro = "Ocorreu um erro.";
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
