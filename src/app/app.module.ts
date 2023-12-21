import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/users/user-login/user-login.component';
import { UserRegisterComponent } from './components/users/user-register/user-register.component';
import { UserPasswordComponent } from './components/users/user-password/user-password.component';
import { EmpresasCadastroComponent } from './components/empresas/empresas-cadastro/empresas-cadastro.component';
import { EmpresasConsultaComponent } from './components/empresas/empresas-consulta/empresas-consulta.component';
import { EmpresasEdicaoComponent } from './components/empresas/empresas-edicao/empresas-edicao.component';
import { FuncionariosCadastroComponent } from './components/funcionarios/funcionarios-cadastro/funcionarios-cadastro.component';
import { FuncionariosConsultaComponent } from './components/funcionarios/funcionarios-consulta/funcionarios-consulta.component';
import { FuncionariosEdicaoComponent } from './components/funcionarios/funcionarios-edicao/funcionarios-edicao.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserPasswordComponent,
    EmpresasCadastroComponent,
    EmpresasConsultaComponent,
    EmpresasEdicaoComponent,
    FuncionariosCadastroComponent,
    FuncionariosConsultaComponent,
    FuncionariosEdicaoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
