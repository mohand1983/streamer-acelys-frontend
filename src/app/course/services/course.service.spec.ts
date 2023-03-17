import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { CourseService } from './course.service';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      providers: [
        HttpClient
      ]
    });
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
