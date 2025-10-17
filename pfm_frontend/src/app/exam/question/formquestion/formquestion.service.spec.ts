import { TestBed } from '@angular/core/testing';

import { FormquestionService } from './formquestion.service';

describe('FormquestionService', () => {
  let service: FormquestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormquestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
