import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { IStudent } from '../interfaces/i-student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public students: IStudent[] = []

  constructor(
    private _studentService: StudentService
  ) { }

  ngOnInit(): void {
    this._studentService.findAll()
      .pipe(
        take(1)
      ).subscribe((students: IStudent[]) => {
        this.students = students
      })
  }

}
