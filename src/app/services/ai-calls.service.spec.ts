import { TestBed } from '@angular/core/testing';

import { AiCallsService } from './ai-calls.service';

describe('AiCallsService', () => {
  let service: AiCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
