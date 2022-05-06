import { Component, OnInit, Inject } from '@angular/core';
import { Categoria } from '../../interfaces/categoria';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { CatalogueCategoriaComponent } from '../../home/catalogues/catalogue-categoria/catalogue-categoria.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiResponse } from '../../interfaces/api-response';

@Component({
  selector: 'app-dialog-add-categoria',
  templateUrl: './dialog-add-categoria.component.html',
  styleUrls: ['./dialog-add-categoria.component.css']
})
export class DialogAddCategoriaComponent implements OnInit {

  categoria: Categoria = {
    nombre: '',
  };

  constructor(
    private fb: FormBuilder,
    private mainService: MainService,
    private dialogRef: MatDialogRef<CatalogueCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Categoria
  ) {}

  nombre: FormControl = this.fb.control('', Validators.required);

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.min(3)]],
  });

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.categoria.id = this.data.id;
      this.miFormulario.controls['nombre'].setValue(this.data.nombre);
    }
  }

  campoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  guardarCategoria() {
    console.log('guardararea')
    if (this.miFormulario.invalid) return;

    this.categoria.nombre = this.miFormulario.controls['nombre'].value;

    if (this.categoria.id) {
      this.mainService.editCategoria( this.categoria ).subscribe(
        response => {
          console.log(response);
          this.cerrar(response);
        }
      )
    } else {
      this.mainService.addCategoria(this.categoria).subscribe(
        response => {
        console.log(response);
        this.cerrar(response)
        }
      );
    }
  }

  cerrar( response: ApiResponse) {
    this.dialogRef.close( response );
  }

}
