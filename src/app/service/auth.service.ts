import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonResponse } from '../model';
import { LoginRequest } from '../model/LoginRequest';
import { LoginResponse } from '../model/loginResponse';
import { ChangePassword } from '../model/change-password';
import { RuoliPermissiTree } from '../model/ruoliPermessiTree';
import { RolePermission } from '../model/rolePermission';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {

    }
    /**
     * autenticazione 
     * @param param 
     */
    singIn(param : LoginRequest) {
        return this.http.post<JsonResponse<LoginResponse>>('/vvf/auth/login', param);
    }
    /**
     * 
     * @param param 
     */
    changePassword(param: ChangePassword) {
        return this.http.post<JsonResponse<String>>('/vvf/user/changepassword', param);
    }
    /**
     * 
     * @param username 
     * @param email 
     */
    recoverPassword(username, email) {
        return this.http.get<JsonResponse<Boolean>>('/vvf/user/recoverpassword', {
            params: {
                username,
                email
            }
        })
    }

    singOut() {
        return this.http.post<JsonResponse<String>>('/vvf/auth/login', null);
    }
    /**
     * recupera i permissi per l'operatore che sta eseguendo il login
     * @param idRuolo 
     */
    getPermissionByRole(idRuolo) {
        return this.http.get<JsonResponse<RuoliPermissiTree>>('/vvf/ruoli/permessi/tree', {
            params: {
                idRuolo
            }
        });
    }
    /**
     * 
     * @param permessi 
     * @param searchId 
     */
    getPermesso(permessi: RolePermission, searchId) : string {
        if (permessi.children && permessi.children.length > 0) {
            permessi.children.forEach(child => {
                return this.getPermesso(child, searchId);
            })
        } else {
            if (permessi.nodId == searchId) {
                return permessi.permesso;
            }
        }
    }

    /**
     * 
     * @param idMenu 
     */
    getPermessoByVoceMenu(idMenu: number) {
        const userLogged = this.getUserLogged();
        if (userLogged != null) {
            const permessi = userLogged.permessi;
            return this.getPermesso(permessi, idMenu);
        }
        return 'N';
    }

    getUserLogged() : LoginResponse {
        return !!localStorage.getItem('userLogged') && 
            JSON.parse(localStorage.getItem('userLogged')) as LoginResponse;
    }

    isLogged() {
        return Boolean(localStorage.getItem('isLogged'));       
    }
}