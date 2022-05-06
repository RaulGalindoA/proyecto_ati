import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddMarcaComponent } from './dialog-add-marca.component';

describe('DialogAddMarcaComponent', () => {
  let component: DialogAddMarcaComponent;
  let fixture: ComponentFixture<DialogAddMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddMarcaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
