import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-funcionarios-consulta',
  templateUrl: './funcionarios-consulta.component.html',
  styleUrls: ['./funcionarios-consulta.component.css']
})
export class FuncionariosConsultaComponent implements OnInit {

  funcionarios: any[] = [];

  pagina: number = 1; //paginação
  filtro: any = { nome: '' }; //filtro

  mensagem: string = '';

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.spinner.show();
    this.httpClient.get(environment.apiUrl + "/Funcionarios")
      .subscribe(
        (res) => {
          this.funcionarios = res as any[];
          this.spinner.hide();
        }
      )
  }

  //função para excluir funcionário
  onDelete(idFuncionario: string): void {

    if (window.confirm('Deseja realmente excluir o funcionário selecionado?')) {

      this.spinner.show();
      this.httpClient.delete(environment.apiUrl + "/Funcionarios/" + idFuncionario)
        .subscribe(
          (res: any) => {
            this.mensagem = `Funcionário ${res.nome} excluído com sucesso.`;
            this.ngOnInit();
            this.pagina = 1;
            this.filtro.nome = '';
            this.spinner.hide();
          }
        )
    }
  }

  //função para realizar a paginação do componente
  handlePageChange(event: any): void {
    this.pagina = event;
  }
}
