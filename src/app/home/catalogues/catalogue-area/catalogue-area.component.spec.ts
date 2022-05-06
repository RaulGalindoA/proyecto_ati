import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueAreaComponent } from './catalogue-area.component';

describe('CatalogueAreaComponent', () => {
  let component: CatalogueAreaComponent;
  let fixture: ComponentFixture<CatalogueAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
