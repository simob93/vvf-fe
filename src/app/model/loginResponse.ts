import { RolePermission } from './rolePermission';

export interface LoginResponse {
    primoAccesso: boolean;
    accessToken: string;
    idRole: number;
    username: string;
    permessi?: RolePermission

}