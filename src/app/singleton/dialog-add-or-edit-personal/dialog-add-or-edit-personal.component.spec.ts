import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddOrEditPersonalComponent } from './dialog-add-or-edit-personal.component';

describe('DialogAddOrEditPersonalComponent', () => {
  let component: DialogAddOrEditPersonalComponent;
  let fixture: ComponentFixture<DialogAddOrEditPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddOrEditPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddOrEditPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
