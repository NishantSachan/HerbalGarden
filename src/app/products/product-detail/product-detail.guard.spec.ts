import { TestBed } from '@angular/core/testing';

import { ProductDetailGuard } from './product-detail.guard';

xdescribe('ProductDetailGuard', () => {
  let guard: ProductDetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProductDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
