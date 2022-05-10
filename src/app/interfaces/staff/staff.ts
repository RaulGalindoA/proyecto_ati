import { StaffPivot } from './staff-pivot';
import { Usuario } from '../usuario';
export interface Staff {
  id?: number;
  pivot?: StaffPivot;
  user_id?: number;
  user?: Usuario
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
  active?: boolean;
}
