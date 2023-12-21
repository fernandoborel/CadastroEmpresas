import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class AuthenticationHelper {
    //método para gravar os dados do usuário autenticado
    //no localStorage
    signIn(dados : any) : void {
        localStorage.setItem('AUTH_USUARIO', JSON.stringify(dados));
    }

    //ler os dados do localStorage
    getAuthData() : any{
        let dados = localStorage.getItem('AUTH_USUARIO');
        if(dados != null)
            return JSON.parse(dados) as any
        else
            return null;
    }

    //apagar o conteúdo da localStorage
    signOut(): void{
        localStorage.removeItem('AUTH_USUARIO');
    }
}