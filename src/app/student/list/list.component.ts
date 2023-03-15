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
  public byIdSortOrder: number = -1
  public byLastNameSortOrder: number = 1
  public sortDefault: string = 'id'
  public checkUncheckAll: boolean = false

  constructor(
    private _studentService: StudentService
  ) { }

  ngOnInit(): void {
    this._studentService.findSimpleStudents()
      .pipe(
        take(1)
      ).subscribe((students: IStudent[]) => {
        this.students = students
      })
  }

  public byId(): void {
    this.students.sort((s1: IStudent, s2: IStudent) => (s1.id! - s2.id!) * this.byIdSortOrder)
    this.byIdSortOrder = this.byIdSortOrder * -1
    this.sortDefault = 'id'
  }

  public byLastname(): void {
    this.students.sort((s1: IStudent, s2: IStudent) => s1.lastName.localeCompare(s2.lastName) * this.byLastNameSortOrder)
    this.byLastNameSortOrder = this.byLastNameSortOrder * -1
    this.sortDefault = 'lastName'
  }

  public onSelectStudent(student: IStudent): void {
    this.checkUncheckAll = this.students.filter((s: IStudent) => s.isSelected).length === this.students.length

    const checkedStudent: IStudent[] = []
    /**
    for (const s of this.students) {
      if (s.isSelected) {
        checkedStudent.push(s)
      }
    }

   this.students.forEach((s: IStudent) => {
    if (s.isSelected) checkedStudent.push(s)
   })

    this.checkUncheckAll = checkedStudent.length === this.students.length
    */
  }

  public onCheckUncheckAll(): void {
    this.students = this.students.map((s) => {
      return {...s, isSelected: this.checkUncheckAll}
    })

    //this.students.forEach((s: IStudent) => s.isSelected = this.checkUncheckAll)
  }

}
