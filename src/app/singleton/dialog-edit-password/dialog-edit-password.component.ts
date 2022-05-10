import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario';
import { ValidatorService } from '../../services/validator.service';
import { UsersComponent } from '../../home/users/users.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from '../../services/main.service';
import { ApiResponse } from '../../interfaces/api-response';

@Component({
  selector: 'app-dialog-edit-password',
  templateUrl: './dialog-edit-password.component.html',
  styleUrls: ['./dialog-edit-password.component.css']
})
export class DialogEditPasswordComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private mainService: MainService,
    private dialogRef: MatDialogRef<UsersComponent>,
    private validatorService: ValidatorService,
    @Inject(MAT_DIALOG_DATA) public data?: Usuario
  ) { }

  hide: boolean = true;
  hide2: boolean = true;

  miFormulario: FormGroup = this.fb.group({
    password:     [, [Validators.required, Validators.minLength(6)]],
    password2:     [, [Validators.required]],
  }, {
    validators: [this.validatorService.camposIguales('password', 'password2')]
  });

  ngOnInit(): void {
    let resp: ApiResponse = { detail: 'Ocurrió un error', done: false }
    if( !this.data )
    this.cerrar( resp )
  }

  campoEsValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid
    && this.miFormulario.get(campo)?.touched;
  }

  submitForm() {
    this.miFormulario.markAllAsTouched();
    if( this.miFormulario.valid ){
      let pass = this.miFormulario.controls['password'].value
      let id = this.data?.id
      this.mainService.editPassword( id!, pass ).subscribe(
        resp => {
          this.cerrar(resp)
        }
      )
    }
  }

  cerrar( response: ApiResponse ) {
    this.dialogRef.close( response );
  }

}
