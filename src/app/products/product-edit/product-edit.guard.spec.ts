import { TestBed } from '@angular/core/testing';

import { ProductEditGuard } from './product-edit.guard';

xdescribe('ProductEditGuard', () => {
  let guard: ProductEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProductEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
