import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraestructureComponent } from './infraestructure.component';

describe('InfraestructureComponent', () => {
  let component: InfraestructureComponent;
  let fixture: ComponentFixture<InfraestructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfraestructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfraestructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
