import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Marca } from '../../interfaces/marca';
import { MainService } from '../../services/main.service';
import { CatalogueMarcaComponent } from '../../home/catalogues/catalogue-marca/catalogue-marca.component';
import { DialogData } from '../../interfaces/dialog-data';
import { ApiResponse } from '../../interfaces/api-response';

@Component({
  selector: 'app-dialog-add-marca',
  templateUrl: './dialog-add-marca.component.html',
  styleUrls: ['./dialog-add-marca.component.css'],
})
export class DialogAddMarcaComponent implements OnInit {
  marca: Marca = {
    nombre: '',
  };

  constructor(
    private fb: FormBuilder,
    private mainService: MainService,
    private dialogRef: MatDialogRef<CatalogueMarcaComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Marca
  ) {}

  nombre: FormControl = this.fb.control('', Validators.required);

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.min(3)]],
  });

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.marca.id = this.data.id;
      this.miFormulario.controls['nombre'].setValue(this.data.nombre);
    }
  }

  campoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  guardarMarca() {
    console.log('guardarmarca')
    if (this.miFormulario.invalid) return;

    this.marca.nombre = this.miFormulario.controls['nombre'].value;

    if (this.marca.id) {
      this.mainService.editMarca( this.marca ).subscribe(
        response => {
          console.log(response);
          this.cerrar(response);
        }
      )
    } else {
      this.mainService.addMarca(this.marca).subscribe(
        response => {
        console.log(response);
        this.cerrar(response)
        }
      );
    }
  }

  cerrar( response: ApiResponse ) {
    this.dialogRef.close( response );
  }
}
