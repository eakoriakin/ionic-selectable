import { TestBed } from '@angular/core/testing';
import { PortService } from './port.service';

describe('PortService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortService = TestBed.get(PortService);
    expect(service).toBeTruthy();
  });
});
