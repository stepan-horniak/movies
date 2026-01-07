import { TestBed } from '@angular/core/testing';

import { MovieServise } from './movie.servise';

describe('MovieServise', () => {
  let service: MovieServise;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieServise);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
