import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

// import {PaginatorModule} from 'primeng/paginator';



@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSelectModule,
    MatTableModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDatepickerModule,
    DragDropModule,
    MatNativeDateModule,
    MatDividerModule,
    MatListModule,
    MatBadgeModule,
    OverlayModule,    
    MatTooltipModule,
    MatAutocompleteModule
  ]
})
export class MaterialModule { }
