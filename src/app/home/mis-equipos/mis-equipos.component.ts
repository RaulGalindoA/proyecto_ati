import { Component, OnInit, ViewChild } from '@angular/core';
import { Equipo } from '../../interfaces/equipo';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { MainService } from '../../services/main.service';
import { Categoria } from '../../interfaces/categoria';
import { Modelo } from '../../interfaces/modelo/modelo';
import { Marca } from '../../interfaces/marca';
import { Area } from '../../interfaces/area/area';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LocalService } from '../../services/local.service';
import { DialogData } from '../../interfaces/dialog-data';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditOwnEquipoComponent } from '../../singleton/dialog-edit-own-equipo/dialog-edit-own-equipo.component';
import { DialogResponseComponent } from '../../singleton/dialog-response/dialog-response.component';
import { Console } from 'console';

@Component({
  selector: 'app-mis-equipos',
  templateUrl: './mis-equipos.component.html',
  styleUrls: ['./mis-equipos.component.css']
})
export class MisEquiposComponent implements OnInit {

  modeloFilter  = 0
  marcaFilter   = 0
  tipoFilter    = 0
  areaFilter    = 0
  nombreFilter  = ''
  serieFilter   = ''
  startFilter   = ''
  endFilter     = ''

  categorias: Categoria[] = []
  modelos: Modelo[] = []
  marcas: Marca[] = []
  areas: Area[] = []

  displayedColumns: string[] = [
    'nombre',
    'num_serie',
    'ultimo_mant',
    'detalles',
    'capacidad',
    'marca',
    'modelo',
    'tipo',
    'area',
    'acciones'
  ]

  dataSource!: MatTableDataSource<Equipo>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor( private mainService: MainService, private localService: LocalService, public dialog: MatDialog ) { }

  token = this.localService.getJsonValue('token')
  id = 0

  ngOnInit(): void {
    this.id = parseInt(this.token.user.id)
    console.log(this.id)
    console.log(this.token)
    this.refreshInfra()
  }

  activateFilters() {
    var dateString = ''  
      if(  this.startFilter && this.startFilter != '' ) {
        var date = new Date(this.startFilter)
        dateString = date.toISOString().split('T')[0]
      }
      var dateString2 = ''
      if ( this.endFilter && this.endFilter != '' ){
        var date2 = new Date(this.endFilter)
        dateString2 = date2.toISOString().split('T')[0]
      }
      console.log(dateString)
    this.mainService.getEquiposByStaff(
      this.id,
      this.modeloFilter,
      this.marcaFilter,
      this.tipoFilter,
      this.areaFilter,
      this.nombreFilter,
      this.serieFilter,
      dateString,
      dateString2
      ).subscribe(
      resp => {
        this.dataSource = new MatTableDataSource<Equipo>(resp);
        this.dataSource.paginator = this.paginator
        this.dataSource.paginator.firstPage()
      }
    )
  }

  cleanFilters() {

  }

  refreshInfra(){
    this.modeloFilter  = 0
    this.marcaFilter   = 0
    this.tipoFilter    = 0
    this.areaFilter    = 0
    this.nombreFilter  = ''
    this.serieFilter   = ''
    this.startFilter   = ''
    this.endFilter     = ''

    this.mainService.getEquiposByStaff(this.id).subscribe(
      resp => {
        this.dataSource = new MatTableDataSource<Equipo>(resp);
        this.dataSource.paginator = this.paginator
        this.dataSource.paginator.firstPage()
      }
    )
  }

  editInfra( equipo: Equipo ){
    let dialogData: DialogData = {
      option: 1,
      message: ''
    }
    const dialogRef = this.dialog.open(
      DialogEditOwnEquipoComponent,
      {
        data: equipo,
        width: '500px',
      }
    );
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if ( result ) {
        if ( result.done == true ){
          dialogData.message = result.detail;
          this.dialog.open(DialogResponseComponent, {
            width: '500px',
            height: 'auto',
            data: dialogData
          });
          this.refreshInfra();
        }
      }
    });
  }

  options: AnimationOptions = {
    path: '/assets/lottie/notfound.json',
  }

  animationCreated(animationItem: AnimationItem): void {}

}
