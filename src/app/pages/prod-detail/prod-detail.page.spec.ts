import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdDetailPage } from './prod-detail.page';

describe('ProdDetailPage', () => {
  let component: ProdDetailPage;
  let fixture: ComponentFixture<ProdDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProdDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
