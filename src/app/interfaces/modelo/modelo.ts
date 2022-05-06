import { ModeloPivot } from './modelo-pivot';
export interface Modelo {
    id?:     number;
    marca?: number;
    nombre: string;
    pivot?:  ModeloPivot;
    active?: boolean;
}