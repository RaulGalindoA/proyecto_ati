import { ModeloPivot } from './modelo-pivot';
import { Marca } from '../marca';
export interface Modelo {
    id?:     number;
    marca?:  Marca;
    nombre:  string;
    pivot?:  ModeloPivot;
    active?: boolean;
}