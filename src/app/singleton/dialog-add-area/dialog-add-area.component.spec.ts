import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddAreaComponent } from './dialog-add-area.component';

describe('DialogAddAreaComponent', () => {
  let component: DialogAddAreaComponent;
  let fixture: ComponentFixture<DialogAddAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
