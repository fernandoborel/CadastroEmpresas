import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-empresas-consulta',
  templateUrl: './empresas-consulta.component.html',
  styleUrls: ['./empresas-consulta.component.css']
})
export class EmpresasConsultaComponent {
  empresas : any[] = []

  pagina: number = 1; //paginação
  filtro: any = {nomeFantasia: ''}; //filtro

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ){}

  ngOnInit(): void{

    this.spinner.show();

    this.httpClient.get(environment.apiUrl + "/Empresas")
      .subscribe(
        (res) => {
          this.empresas = res as any[];
          this.spinner.hide();
        }
      );
  }

  //paginação do componente
  handlePageChange(event: any): void {
    this.pagina = event;
  }
}
