export interface Usuario {
    id?: number;
    user?: string;
    password?: string;
    mail?: string;
    nivel?: string;
    active?:     boolean;
    created_at?: Date;
    updated_at?: null;
    created_by?: number;
    updated_by?: null;
}
