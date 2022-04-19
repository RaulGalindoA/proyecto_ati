import { Component } from '@angular/core';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyectoATI';

  texto: string = '';

  constructor(private mainService: MainService){
    this.mainService.testService().subscribe(
      resp => {
        console.log(resp);
        this.texto = resp;
      }
    )
  }

}
