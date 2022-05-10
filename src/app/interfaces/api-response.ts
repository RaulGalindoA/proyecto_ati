import { Usuario } from './usuario';
export interface ApiResponse {
    detail: any;
    done:   boolean;
    user?:   Usuario
}
