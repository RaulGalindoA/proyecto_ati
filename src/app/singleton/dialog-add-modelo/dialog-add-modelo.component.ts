import { Component, OnInit, Inject } from '@angular/core';
import { Modelo } from '../../interfaces/modelo/modelo';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatalogueModeloComponent } from '../../home/catalogues/catalogue-modelo/catalogue-modelo.component';
import { ApiResponse } from '../../interfaces/api-response';
import { Marca } from '../../interfaces/marca';

@Component({
  selector: 'app-dialog-add-modelo',
  templateUrl: './dialog-add-modelo.component.html',
  styleUrls: ['./dialog-add-modelo.component.css']
})
export class DialogAddModeloComponent implements OnInit {

  modelo: Modelo = {
    nombre: '',
  };

  marcas!: Marca[];

  constructor(
    private fb: FormBuilder,
    private mainService: MainService,
    private dialogRef: MatDialogRef<CatalogueModeloComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Modelo
  ) {}

  nombre: FormControl = this.fb.control('', Validators.required);

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.min(3)]],
    marca:  [, [Validators.required]]
  });

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.modelo.id = this.data.id;
      this.miFormulario.controls['nombre'].setValue(this.data.nombre);
      this.miFormulario.controls['marca'].setValue(this.data.marca);
    }

    this.mainService.getMarcas().subscribe(
      resp => {
        this.marcas = resp;
      }
    )
  }

  campoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  guardarModelo() {
    console.log('guardarmodelo')
    if (this.miFormulario.invalid) return;

    this.modelo.nombre = this.miFormulario.controls['nombre'].value;
    this.modelo.marca = this.miFormulario.controls['marca'].value;
    console.log(this.modelo)

    if (this.modelo.id) {
      this.mainService.editModelo( this.modelo ).subscribe(
        response => {
          console.log(response);
          this.cerrar(response);
        }
      )
    } else {
      this.mainService.addModelo(this.modelo).subscribe(
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
