import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogAddOrEditInfraestructureComponent } from '../../singleton/dialog-add-or-edit-infraestructure/dialog-add-or-edit-infraestructure.component';
import { DialogResponseComponent } from '../../singleton/dialog-response/dialog-response.component';
import { DialogAddOrEditPersonalComponent } from '../../singleton/dialog-add-or-edit-personal/dialog-add-or-edit-personal.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  newPersonal() {
    const dialogRef = this.dialog.open(
      DialogAddOrEditPersonalComponent,
      {
        data: {
          animal: 'panda',
        },
        width: '500px',
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      const dialogRef = this.dialog.open(DialogResponseComponent, {
        data: {
          animal: 'panda',
        },
        width: '500px',
      });
      console.log(`Dialog result: ${result}`);
    });
  }

}