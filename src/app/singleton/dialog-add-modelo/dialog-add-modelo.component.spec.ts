import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddModeloComponent } from './dialog-add-modelo.component';

describe('DialogAddModeloComponent', () => {
  let component: DialogAddModeloComponent;
  let fixture: ComponentFixture<DialogAddModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddModeloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
