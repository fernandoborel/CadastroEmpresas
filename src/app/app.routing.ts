import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

//importando os componentes que serão mapeados
import { UserLoginComponent } from "./components/users/user-login/user-login.component";
import { UserRegisterComponent } from "./components/users/user-register/user-register.component";
import { UserPasswordComponent } from "./components/users/user-password/user-password.component";

import { EmpresasCadastroComponent } from "./components/empresas/empresas-cadastro/empresas-cadastro.component";
import { EmpresasConsultaComponent } from "./components/empresas/empresas-consulta/empresas-consulta.component";
import { EmpresasEdicaoComponent } from "./components/empresas/empresas-edicao/empresas-edicao.component";

import { FuncionariosCadastroComponent } from "./components/funcionarios/funcionarios-cadastro/funcionarios-cadastro.component";
import { FuncionariosConsultaComponent } from "./components/funcionarios/funcionarios-consulta/funcionarios-consulta.component";
import { FuncionariosEdicaoComponent } from "./components/funcionarios/funcionarios-edicao/funcionarios-edicao.component";

//mapeamento das rotas
const routes: Routes = [
    { path: '', component: UserLoginComponent }, /* raiz do projeto */
    { path: 'user-register', component: UserRegisterComponent },
    { path: 'user-password', component: UserPasswordComponent},

    { path: 'empresas-cadastro', component: EmpresasCadastroComponent},
    { path: 'empresas-consulta', component: EmpresasConsultaComponent},
    { path: 'empresas-edicao/:idEmpresa', component: EmpresasEdicaoComponent},

    {path: 'funcionarios-cadastro', component: FuncionariosCadastroComponent},
    {path: 'funcionarios-consulta', component: FuncionariosConsultaComponent},
    {path: 'funcionarios-edicao/idFuncionario', component: FuncionariosEdicaoComponent}
];

//registrando as rotas e o módulo
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

//gerando a classe para este arquivo de configuração
export class AppRoutingModule { }