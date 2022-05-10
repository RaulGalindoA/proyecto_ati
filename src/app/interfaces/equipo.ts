import { Modelo } from './modelo/modelo';
import { Tipo } from './tipo/tipo';
import { Staff } from './staff/staff';
import { Area } from './area/area';
export interface Equipo {
    id?:          number;
    nombre?:      string;
    num_serie?:   string;
    ultimo_mant?: Date;
    detalles?:    string;
    capacidad?:   string;
    unidad?:      string;
    modelo?:      Modelo[]  | string;
    tipo?:        Tipo[]    | string;
    staff?:       Staff[]   | string;
    area?:        Area[]    | string;
    active?:      boolean;
}