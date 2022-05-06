import { AreaPivot } from './area-pivot';
export interface Area {
    id?:     number;
    nombre: string;
    active?: boolean;
    pivot?:  AreaPivot;
}