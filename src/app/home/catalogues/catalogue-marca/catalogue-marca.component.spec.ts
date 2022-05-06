import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueMarcaComponent } from './catalogue-marca.component';

describe('CatalogueMarcaComponent', () => {
  let component: CatalogueMarcaComponent;
  let fixture: ComponentFixture<CatalogueMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueMarcaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
