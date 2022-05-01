import { Modelo } from './modelo/modelo';
import { Tipo } from './tipo/tipo';
import { Staff } from './staff/staff';
import { Area } from './area/area';
export interface Equipo {
    id:          number;
    nombre:      string;
    num_serie:   string;
    ultimo_mant: Date;
    detalles:    null;
    capacidad:   string;
    unidad:      string;
    modelo:      Modelo[];
    tipo:        Tipo[];
    staff:       Staff[];
    area:        Area[];
}