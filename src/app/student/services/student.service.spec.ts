import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { IStudent } from '../interfaces/i-student';

import { StudentService } from './student.service';

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        HttpClient
      ]
    });
    service = TestBed.inject(StudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`Should be an instance of Observable`, () => {
    let oIStudent = service.findAll()
    expect(oIStudent).toBeInstanceOf(Observable)
  })
});
