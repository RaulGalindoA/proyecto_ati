import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogAddOrEditInfraestructureComponent } from '../../singleton/dialog-add-or-edit-infraestructure/dialog-add-or-edit-infraestructure.component';
import { DialogResponseComponent } from '../../singleton/dialog-response/dialog-response.component';
import { Equipo } from '../../interfaces/equipo';
import { MainService } from '../../services/main.service';
import { Marca } from '../../interfaces/marca';
import { Staff } from '../../interfaces/staff/staff';
import { Modelo } from '../../interfaces/modelo/modelo';
import { Area } from '../../interfaces/area/area';
import { DialogData } from '../../interfaces/dialog-data';
import { Categoria } from '../../interfaces/categoria';
import { DialogConfirmComponent } from '../../singleton/dialog-confirm/dialog-confirm.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-infraestructure',
  templateUrl: './infraestructure.component.html',
  styleUrls: ['./infraestructure.component.css'],
})
export class InfraestructureComponent implements OnInit {
  constructor(private route: ActivatedRoute, public dialog: MatDialog, private mainService: MainService) {}

  displayedColumns: string[] = ['nombre', 'num_serie', 'ultimo_mant', 'detalles', 'capacidad', /* 'unidad',  */'marca', 'modelo', 'tipo', 'staff', 'area', 'acciones'];
  dataSource!: MatTableDataSource<Equipo>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  marcas: Marca[] = [];
  modelos: Modelo[] = [];
  areas: Area[] = [];
  staffs: Staff[] = [];
  categorias: Categoria[] = [];

  modeloFilter: number = 0;
  marcaFilter:  number = 0;
  tipoFilter:   number = 0;
  areaFilter:   number = 0;
  staffFilter:  number = 0; 
  nombreFilter: string = '';
  serieFilter:  string = '';
  startFilter:  string = '';
  endFilter:    string = '';

  ngOnInit(): void {

    let param = this.route.snapshot.queryParamMap.get('type');
    if ( param == 'electrical' ) this.tipoFilter = 2
    if ( param == 'network' ) this.tipoFilter = 3
    if ( param == 'cooling' ) this.tipoFilter = 4
    if ( param == 'hardware' ) this.tipoFilter = 5
    if ( param == 'software' ) this.tipoFilter = 6
    if ( param == 'extinguisher' ) this.tipoFilter = 7

    this.mainService.getEquipos(1, undefined , undefined, this.tipoFilter).subscribe(
      resp => {
        this.dataSource = new MatTableDataSource<Equipo>(resp);
        this.dataSource.paginator = this.paginator
        this.dataSource.paginator.firstPage()
      }
    )
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
    this.mainService.getModelos(1).subscribe(
      resp => {
        this.modelos = resp;
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

  options: AnimationOptions = {
    path: '/assets/lottie/notfound.json',
  }

  animationCreated(animationItem: AnimationItem): void {}

  newInfraestructure() {
    let dialogData: DialogData = {
      option: 1,
      message: ''
    }
    const dialogRef = this.dialog.open(
      DialogAddOrEditInfraestructureComponent,
      {
        width: '500px',
      }
    );
    dialogRef.afterClosed().subscribe((result) => {
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

  editInfra( equipo: Equipo ){
    let dialogData: DialogData = {
      option: 1,
      message: ''
    }
    const dialogRef = this.dialog.open(
      DialogAddOrEditInfraestructureComponent,
      {
        data: equipo,
        width: '500px',
      }
    );
    dialogRef.afterClosed().subscribe((result) => {
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

  deleteInfra( equipo: Equipo ){
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: `¿Está seguro de que desea eliminar la marca <b>${equipo.nombre}</b>?` 
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if( result ){
        let dialogData: DialogData = {
          option: 1,
          message: ''
        }
        this.mainService.deleteEquipo( equipo.id! ).subscribe(
          resp => {
            dialogData.message = resp.detail 
            this.dialog.open(DialogResponseComponent, {
              width: '500px',
              data: dialogData
            })
            this.refreshInfra();
          }
        )
      }
    })
  }

  refreshInfra(){
    this.modeloFilter  = 0
    this.marcaFilter   = 0
    this.tipoFilter    = 0
    this.areaFilter    = 0
    this.staffFilter   = 0
    this.nombreFilter  = ''
    this.serieFilter   = ''
    this.startFilter   = ''
    this.endFilter     = ''
    this.mainService.getEquipos(1).subscribe(
      resp => {
        this.dataSource = new MatTableDataSource<Equipo>(resp);
        this.dataSource.paginator = this.paginator
        this.dataSource.paginator.firstPage()
      }
    )
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

      this.mainService.getEquipos(
        1,
        this.modeloFilter,
        this.marcaFilter,
        this.tipoFilter,
        this.staffFilter,
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

}
