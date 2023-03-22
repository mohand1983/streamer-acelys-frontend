import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { StudentFormComponent } from '../dialogs/student-form/student-form.component';
import { IStudent } from '../interfaces/i-student';
import { StudentModel } from '../models/student-model';
import { StudentService } from '../services/student.service';
import { SimpleStudent } from '../types/simple-student-type';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public students: SimpleStudent[] = []
  public byIdSortOrder: number = -1
  public byLastNameSortOrder: number = 1
  public sortDefault: string = 'id'
  public checkUncheckAll: boolean = false

  constructor(
    private _studentService: StudentService,
    private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._studentService.findSimpleStudents()
      .pipe(
        take(1)
      ).subscribe((students: SimpleStudent[]) => {
        this.students = students
        this.students.sort((s1: SimpleStudent, s2: SimpleStudent) => s1.id! - s2.id!)
      })
  }

  /**
   * Open a dialog with a form
   * if a SimpleStudent was passed, get whole student from service before open dialog
   * @todo Keep dialogRef instance avoiding open multiple dialogs
   */
  public openForm(student: SimpleStudent | null = null): void {
    if (!student) {
      this._openDialog(new StudentModel())
    } else {
      this._studentService.findOne(student.id)
        .subscribe((completeStudent: StudentModel) => {
          this._openDialog(completeStudent)
        })
    }
  }

  public byId(): void {
    this.students.sort((s1: SimpleStudent, s2: SimpleStudent) => (s1.id! - s2.id!) * this.byIdSortOrder)
    this.byIdSortOrder = this.byIdSortOrder * -1
    this.sortDefault = 'id'
  }

  public byLastname(): void {
    this.students.sort((s1: SimpleStudent, s2: SimpleStudent) => s1.lastName.localeCompare(s2.lastName) * this.byLastNameSortOrder)
    this.byLastNameSortOrder = this.byLastNameSortOrder * -1
    this.sortDefault = 'lastName'
  }

  public onSelectStudent(student: SimpleStudent): void {
    this.checkUncheckAll = this.students.filter((s: SimpleStudent) => s.isSelected).length === this.students.length

    const checkedStudent: SimpleStudent[] = []
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

  private _openDialog(student: StudentModel): void {
    const dialogRef = this._matDialog.open(StudentFormComponent, {
      width: '500px',
      height: '500px',
      hasBackdrop: false,
      data: {student} // student is passed to dialog => {student: student}
    })

    dialogRef.afterClosed().subscribe((result: any) => { // student was received from dialog
      if (result) {
        console.log(`Got a result, do a job`)
      } else {
        console.log(`No result, lunch time`)
      }
    })
  }
}
