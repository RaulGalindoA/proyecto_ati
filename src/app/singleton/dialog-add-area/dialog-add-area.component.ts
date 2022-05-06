import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
import { Area } from '../../interfaces/area/area';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatalogueAreaComponent } from '../../home/catalogues/catalogue-area/catalogue-area.component';
import { ApiResponse } from '../../interfaces/api-response';

@Component({
  selector: 'app-dialog-add-area',
  templateUrl: './dialog-add-area.component.html',
  styleUrls: ['./dialog-add-area.component.css']
})
export class DialogAddAreaComponent implements OnInit {
  
  area: Area = {
    nombre: '',
  };

  constructor(
    private fb: FormBuilder,
    private mainService: MainService,
    private dialogRef: MatDialogRef<CatalogueAreaComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Area
  ) {}

  nombre: FormControl = this.fb.control('', Validators.required);

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.min(3)]],
  });

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.area.id = this.data.id;
      this.miFormulario.controls['nombre'].setValue(this.data.nombre);
    }
  }

  campoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  guardarArea() {
    console.log('guardararea')
    if (this.miFormulario.invalid) return;

    this.area.nombre = this.miFormulario.controls['nombre'].value;

    if (this.area.id) {
      this.mainService.editArea( this.area ).subscribe(
        response => {
          console.log(response);
          this.cerrar(response);
        }
      )
    } else {
      this.mainService.addArea(this.area).subscribe(
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
