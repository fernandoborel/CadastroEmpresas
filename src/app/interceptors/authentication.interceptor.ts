import { Injectable } from "@angular/core";
import { AuthenticationHelper } from "../helpers/authentication.helper";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class AuthenticationInteceptor implements HttpInterceptor {
    constructor(
        private authenticationHelper: AuthenticationHelper
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url.includes('api/Empresas') || req.url.includes('api/Funcionarios')){
            
            let token = this.authenticationHelper.getAuthData().token;

            req = req.clone({
                setHeaders:{
                    Authorization: 'Bearer ' + token
                }
            }); 
        }

        return next.handle(req);
    }
}