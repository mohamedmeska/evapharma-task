import { TestBed } from '@angular/core/testing';

import { ApisUrlService } from './apis-url.service';

describe('ApisUrlService', () => {
  let service: ApisUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApisUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
