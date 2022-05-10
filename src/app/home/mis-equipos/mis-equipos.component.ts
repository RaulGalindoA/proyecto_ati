import { Component, OnInit } from '@angular/core';
import { Equipo } from '../../interfaces/equipo';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { MainService } from '../../services/main.service';
import { Categoria } from '../../interfaces/categoria';
import { Modelo } from '../../interfaces/modelo/modelo';
import { Marca } from '../../interfaces/marca';
import { Area } from '../../interfaces/area/area';

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
  staffFilter   = 0
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
  dataSource: Equipo[] = []

  constructor( private mainService: MainService ) { }

  ngOnInit(): void {
    this.refreshInfra()
  }

  activateFilters() {

  }

  cleanFilters() {

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
        this.dataSource = resp;
        console.log(resp);
      }
    )
  }

  editInfra(equipo: Equipo){

  }

  options: AnimationOptions = {
    path: '/assets/lottie/notfound.json',
  }

  animationCreated(animationItem: AnimationItem): void {}

}
