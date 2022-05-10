import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditOwnEquipoComponent } from './dialog-edit-own-equipo.component';

describe('DialogEditOwnEquipoComponent', () => {
  let component: DialogEditOwnEquipoComponent;
  let fixture: ComponentFixture<DialogEditOwnEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditOwnEquipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditOwnEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
