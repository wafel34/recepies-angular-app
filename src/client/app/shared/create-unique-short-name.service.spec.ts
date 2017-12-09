import { TestBed, inject } from '@angular/core/testing';

import { CreateUniqueShortNameService } from './create-unique-short-name.service';

describe('CreateUniqueShortNameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateUniqueShortNameService]
    });
  });

  it('should be created', inject([CreateUniqueShortNameService], (service: CreateUniqueShortNameService) => {
    expect(service).toBeTruthy();
  }));
});
