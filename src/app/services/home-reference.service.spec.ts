import { HomeReferenceService } from './home-reference.service';
import { TestBed } from '@angular/core/testing';



describe('HomeReferenceService', () => {
  let service: HomeReferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeReferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
