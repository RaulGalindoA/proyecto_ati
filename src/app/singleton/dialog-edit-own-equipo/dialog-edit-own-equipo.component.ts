import { Component, OnInit, Inject } from '@angular/core';
import { MainService } from '../../services/main.service';
import { MisEquiposComponent } from '../../home/mis-equipos/mis-equipos.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Equipo } from '../../interfaces/equipo';
import { ApiResponse } from '../../interfaces/api-response';

@Component({
  selector: 'app-dialog-edit-own-equipo',
  templateUrl: './dialog-edit-own-equipo.component.html',
  styleUrls: ['./dialog-edit-own-equipo.component.css'],
})
export class DialogEditOwnEquipoComponent implements OnInit {
  fecha: Date = new Date();
  detalle: string = '';

  constructor(
    private mainService: MainService,
    private dialogRef: MatDialogRef<MisEquiposComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Equipo
  ) {}

  ngOnInit(): void {
    this.fecha = this.data?.ultimo_mant! as Date;
    this.detalle = this.data?.detalles!;
    console.log(this.data);
  }

  cerrar(response: ApiResponse) {
    this.dialogRef.close(response);
  }

  enviar() {
    var dateString = '';
    if (this.fecha) {
      var date = new Date(this.fecha);
      dateString = date.toISOString().split('T')[0];
    }

    let equipo: Equipo = {
      id: this.data?.id,
      detalles: this.detalle,
      ultimo_mant: dateString,
    };

    this.mainService.editOwnEquipo( equipo ).subscribe(
      resp => {
        this.cerrar( resp )
      }
    )
  }
}
