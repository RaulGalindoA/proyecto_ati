import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Staff } from 'src/app/interfaces/staff/staff';
import { MainService } from '../../services/main.service';
import { Marca } from '../../interfaces/marca';
import { Modelo } from '../../interfaces/modelo/modelo';
import { Area } from '../../interfaces/area/area';
import { Categoria } from '../../interfaces/categoria';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InfraestructureComponent } from '../../home/infraestructure/infraestructure.component';
import { ValidatorService } from '../../services/validator.service';
import { Equipo } from '../../interfaces/equipo';
import { ApiResponse } from '../../interfaces/api-response';

@Component({
  selector: 'app-dialog-add-or-edit-infraestructure',
  templateUrl: './dialog-add-or-edit-infraestructure.component.html',
  styleUrls: ['./dialog-add-or-edit-infraestructure.component.css']
})
export class DialogAddOrEditInfraestructureComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InfraestructureComponent>,
    private validatorService: ValidatorService,
    private mainService: MainService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  marcas: Marca[] = [];
  modelos: Modelo[] = [];
  areas: Area[] = [];
  staffs: Staff[] = [];
  categorias: Categoria[] = [];

  equipo: Equipo = {
    nombre: '',
    num_serie: '',
    capacidad: '',
    unidad: '',
    tipo: '',
    modelo: '',
    detalles: '',
    staff: '',
    area: ''
  }

  miFormulario: FormGroup = this.fb.group({
    nombre:     [, [Validators.required]],
    num_serie:     [, [Validators.required]],
    capacidad:     [, [Validators.required]],
    unidad:     [, [Validators.required]],
    categoria:     [, [Validators.required]],
    marca:     [, [Validators.required]],
    modelo:     [/* {disabled: true} */, [Validators.required]],
    staff:     [, [Validators.required]],
    area: [, [Validators.required]],
    detalles:     [, [Validators.required]],
  });


  onChange(a:any){
    this.miFormulario.controls['modelo']    .setValue(null)
    let marca = this.miFormulario.get('marca')?.value;
    this.mainService.getModelos(1, undefined, marca).subscribe(
      resp => {
        this.modelos = resp;
      }
    )
  }

  ngOnInit(): void {
    console.log(this.data);
    if( this.data ){
      this.equipo.id = this.data.id
      this.miFormulario.controls['nombre']   .setValue(this.data.nombre);
      this.miFormulario.controls['num_serie'].setValue(this.data.num_serie);
      this.miFormulario.controls['capacidad'].setValue(this.data.capacidad);
      this.miFormulario.controls['unidad']   .setValue(this.data.unidad);
      this.miFormulario.controls['categoria'].setValue(this.data.tipo[0].id);
      this.miFormulario.controls['modelo']   .setValue(this.data.modelo[0].id);
      console.log(this.miFormulario.get('modelo')?.value)
      this.miFormulario.controls['marca']    .setValue(this.data.modelo[0].marca.id);
      this.miFormulario.controls['detalles'] .setValue(this.data.detalles);
      this.miFormulario.controls['staff']    .setValue(this.data.staff[0].id);
      this.miFormulario.controls['area']     .setValue(this.data.area[0].id);
      this.mainService.getModelos(1, undefined, this.data.modelo[0].marca.id).subscribe(
        resp => {
          this.modelos = resp;
        }
      )
    } 
    
    this.mainService.getMarcas(1).subscribe(
      resp => {
        this.marcas = resp;
      }
    )
    this.mainService.getAreas(1).subscribe(
      resp => {
        this.areas = resp;
      }
    )
    
    this.mainService.getStaffs(1).subscribe(
      resp => {
        this.staffs = resp;
      }
    )
    this.mainService.getCategories(1).subscribe(
      resp => {
        this.categorias = resp;
      }
    )
  }

  campoEsValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid
    && this.miFormulario.get(campo)?.touched;
  }

  submitForm(){
    this.miFormulario.markAllAsTouched()
    if( this.miFormulario.invalid ) return;
    this.equipo.nombre    =  this.miFormulario.get('nombre')?.value;
    this.equipo.num_serie =  this.miFormulario.get('num_serie')?.value;
    this.equipo.capacidad =  this.miFormulario.get('capacidad')?.value;
    this.equipo.unidad    =  this.miFormulario.get('unidad')?.value;
    this.equipo.tipo      =  this.miFormulario.get('categoria')?.value;
    this.equipo.modelo    =  this.miFormulario.get('modelo')?.value;
    this.equipo.detalles  =  this.miFormulario.get('detalles')?.value;
    this.equipo.staff     =  this.miFormulario.get('staff')?.value;
    this.equipo.area      =  this.miFormulario.get('area')?.value;

    if( !this.data ){
      this.mainService.addEquipo( this.equipo ).subscribe(
        resp => {
          if( resp.done ){
            this.dialogRef.close ( resp )
          }
        }, 
        )
    } else {
      this.mainService.editEquipo( this.equipo ).subscribe(
        resp => {
          if ( resp.done ){
            this.dialogRef.close ( resp )
          } 
        }
      )
    }
  }

  cerrar( response: ApiResponse ) {
    this.dialogRef.close( response );
  }

}
