import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueCategoriaComponent } from './catalogue-categoria.component';

describe('CatalogueCategoriaComponent', () => {
  let component: CatalogueCategoriaComponent;
  let fixture: ComponentFixture<CatalogueCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
