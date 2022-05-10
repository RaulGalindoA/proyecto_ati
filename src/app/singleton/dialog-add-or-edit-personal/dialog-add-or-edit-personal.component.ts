import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainService } from '../../services/main.service';
import { HomeComponent } from '../../home/home.component';
import { ValidatorService } from '../../services/validator.service';
import { Staff } from '../../interfaces/staff/staff';
import { ApiResponse } from '../../interfaces/api-response';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-dialog-add-or-edit-personal',
  templateUrl: './dialog-add-or-edit-personal.component.html',
  styleUrls: ['./dialog-add-or-edit-personal.component.css'],
})
export class DialogAddOrEditPersonalComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private mainService: MainService,
    private dialogRef: MatDialogRef<HomeComponent>,
    private validatorService: ValidatorService,
    @Inject(MAT_DIALOG_DATA) public data?: Staff
  ) {}

  personal: Staff = {
    nombre : '',
    user_id: 0,
    apellido_paterno : '',
    apellido_materno : '',
    direccion : '',
    telefono : '',
    mail : '',
    puesto : '',
    rfc : '',
    curp : '',
    num_staff : '',
  };

  usuarios: Usuario[] = []

  miFormulario: FormGroup = this.fb.group({
    nombre:     [, [Validators.required]],
    apemat:     [, [Validators.required]],
    apepat:     [, [Validators.required]],
    direccion:  [, [Validators.required]],
    telefono:   [, [Validators.required, Validators.pattern(this.validatorService.numberPattern)]],
    mail:       [, [Validators.required, Validators.pattern(this.validatorService.emailPattern),]],
    puesto:     [, [Validators.required]],
    rfc:        [, [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
    curp:       [, [Validators.required]],
    numstaff:   [, [Validators.required]],
    user_id:    [, [Validators.required]]
  });

  ngOnInit(): void {
    if ( this.data ) {
      this.usuarios.push( this.data.user! );
      this.personal = this.data;
      // this.personal.user_id = 1;
      console.log(this.personal)
      this.miFormulario.controls['user_id'].setValue(this.usuarios[0].id)
      this.miFormulario.controls['nombre'].setValue(this.personal.nombre)
      this.miFormulario.controls['apemat'].setValue(this.personal.apellido_paterno)
      this.miFormulario.controls['apepat'].setValue(this.personal.apellido_materno)
      this.miFormulario.controls['direccion'].setValue(this.personal.direccion)
      this.miFormulario.controls['telefono'].setValue(this.personal.telefono)
      this.miFormulario.controls['mail'].setValue(this.personal.mail)
      this.miFormulario.controls['puesto'].setValue(this.personal.puesto)
      this.miFormulario.controls['rfc'].setValue(this.personal.rfc)
      this.miFormulario.controls['curp'].setValue(this.personal.curp)
      this.miFormulario.controls['numstaff'].setValue(this.personal.num_staff)
    } else {
      this.mainService.getUsers(1, undefined, undefined, 'unused').subscribe(
        resp => {
          this.usuarios = resp;
          console.log(resp);
        }
      )
    }
    
  }

  

  submitForm() {
    this.miFormulario.markAllAsTouched();
    if( this.miFormulario.valid ){
      this.personal.nombre            = this.miFormulario.get('nombre')?.value;
      this.personal.apellido_paterno  = this.miFormulario.get('apemat')?.value;
      this.personal.apellido_materno  = this.miFormulario.get('apepat')?.value;
      this.personal.direccion         = this.miFormulario.get('direccion')?.value;
      this.personal.telefono          = this.miFormulario.get('telefono')?.value;
      this.personal.mail              = this.miFormulario.get('mail')?.value;
      this.personal.puesto            = this.miFormulario.get('puesto')?.value;
      this.personal.rfc               = this.miFormulario.get('rfc')?.value;
      this.personal.curp              = this.miFormulario.get('curp')?.value;
      this.personal.num_staff         = this.miFormulario.get('numstaff')?.value;
      this.personal.user_id           = this.miFormulario.get('user_id')?.value;
      delete this.personal.user
      if ( this.personal.id ){
        this.mainService.editStaff( this.personal ).subscribe(
          resp => {
            this.cerrar(resp);
          }
        )
      } else {
        this.mainService.addStaff( this.personal ).subscribe(
          resp => {
            this.cerrar(resp);
          }
        )
      }
    }
  }

  get emailErrorMsg():string{
    const errors = this.miFormulario.get('mail')?.errors;
    if ( errors?.['required'] ){
      return 'Email es obligatorio'
    } else if (errors?.['pattern']) {
      return 'El valor ingresado no tiene formato de correo electrónico'
    } /* else if ( errors?.emailTomado ){
      console.log(errors?.emailTomado);
      return 'El email ya fue tomado';
    } */
    return '';
  }

  get numberErrorMsg(): string {
    const errors = this.miFormulario.get('telefono')?.errors;
    if ( errors?.['required'] ){
      return 'Número es obligatorio'
    } else if (errors?.['pattern']) {
      return 'El valor ingresado no es un número'
    }
    return ''
  }

  get rfcErrorMsg(): string {
    const errors = this.miFormulario.get('rfc')?.errors;
    if ( errors?.['required'] ){
      return 'RFC es obligatorio'
    } else if (errors?.['minlength']) {
      return 'RFC debe tener 13 carácteres exactamente'
    } else if (errors?.['maxlength']) {
      return 'RFC debe tener 13 carácteres exactamente'
    }
    return ''
  }

  campoEsValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid
    && this.miFormulario.get(campo)?.touched;
  }

  cerrar( response: ApiResponse ) {
    this.dialogRef.close( response );
  }
}
