import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddOrEditInfraestructureComponent } from './dialog-add-or-edit-infraestructure.component';

describe('DialogAddOrEditInfraestructureComponent', () => {
  let component: DialogAddOrEditInfraestructureComponent;
  let fixture: ComponentFixture<DialogAddOrEditInfraestructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddOrEditInfraestructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddOrEditInfraestructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
