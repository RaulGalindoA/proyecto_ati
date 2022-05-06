import { StaffPivot } from './staff-pivot';
export interface Staff {
  pivot?: StaffPivot;
  id: number;
  nombre: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  direccion?: string;
  telefono?: string;
  mail?: string;
  puesto?: string;
  rfc?: string;
  curp?: string;
  num_staff?: string;
}
