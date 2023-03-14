import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudent } from '../interfaces/i-student';
import { StudentModel } from '../models/student-model';

import { environment } from './../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly endpoint: string = `${environment.apiRootUri}students`

  constructor(
    private _httpClient: HttpClient // DI Angular
  ) { }

  /**
   * Send a GET request to http://127.0.0.1:5000/api/v1/students
   * @returns Observable<IStudent>
   */
  public findAll(): Observable<IStudent[]> {
    return this._httpClient.get<IStudent[]>(
      this.endpoint
    )
  }

  public findSimpleStudents(): Observable<IStudent[]> {
    return this._httpClient.get<IStudent[]>(
      this.endpoint
    )
  }

  public findOne(id: number): void {}

  public findByEmail(email: string): void {}

  public findByLoginOrEmail(email: string, login: string): void {}

  public add(student: IStudent): void {}

  public update(student: StudentModel): void {}

  public remove(student: StudentModel): void {}
}
