import { ModeloPivot } from './modelo-pivot';
export interface Modelo {
    id:     number;
    nombre: string;
    pivot:  ModeloPivot;
}