import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersComponent } from '../../home/users/users.component';
import { ValidatorService } from '../../services/validator.service';
import { Usuario } from '../../interfaces/usuario';
import { ApiResponse } from '../../interfaces/api-response';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.css']
})
export class DialogAddUserComponent implements OnInit {

  hide: boolean = true;
  hide2: boolean = true;

  niveles: string[] = ['Admin', 'Staff', 'Cooler Staff']

  constructor(
    private fb: FormBuilder,
    private mainService: MainService,
    private dialogRef: MatDialogRef<UsersComponent>,
    private validatorService: ValidatorService,
    @Inject(MAT_DIALOG_DATA) public data?: Usuario
  ) { }

  usuario: Usuario = {
    id : 0,
    user : '',
    password : '',
    mail : '',
    nivel : '',
  }

  miFormulario: FormGroup = this.fb.group({
    user:     [, [Validators.required]],
    password:     [, [Validators.required, Validators.minLength(6)]],
    password2:     [, [Validators.required]],
    mail:  [, [Validators.required]],
    nivel: [,Validators.required]
  }, {
    validators: [this.validatorService.camposIguales('password', 'password2')]
  });

  ngOnInit(): void {
    if ( this.data ){
      console.log(this.data)
      this.usuario = this.data;
      this.miFormulario.controls['user'].setValue(this.usuario.user);
      this.miFormulario.controls['mail'].setValue(this.usuario.mail);
      this.miFormulario.controls['nivel'].setValue(this.usuario.nivel);
      this.miFormulario.removeControl('password');
      this.miFormulario.removeControl('password2');
    } 
  }

  campoEsValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid
    && this.miFormulario.get(campo)?.touched;
  }

  submitForm() {
    this.miFormulario.markAllAsTouched();
    if( this.miFormulario.valid ){
      this.usuario.mail = this.miFormulario.get('mail')?.value;
      this.usuario.nivel = this.miFormulario.get('nivel')?.value;
      this.usuario.user = this.miFormulario.get('user')?.value;

      if( this.data ){
        console.log(this.data);
        this.mainService.editUser( this.usuario ).subscribe(
          resp => {
            this.cerrar(resp);
          }
        )

      } else {
        delete this.usuario.id;
        this.usuario.password = this.miFormulario.get('password')?.value;

        this.mainService.register(this.usuario).subscribe(
          resp => {
            console.log(resp)
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

  cerrar( response: ApiResponse ) {
    this.dialogRef.close( response );
  }
}
