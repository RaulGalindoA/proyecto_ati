import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueModeloComponent } from './catalogue-modelo.component';

describe('CatalogueModeloComponent', () => {
  let component: CatalogueModeloComponent;
  let fixture: ComponentFixture<CatalogueModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueModeloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
