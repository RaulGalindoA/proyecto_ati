import { StaffPivot } from './staff-pivot';
export interface Staff {
    id:     number;
    nombre: string;
    pivot:  StaffPivot;
}