import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { CourseService } from '../services/course.service';
import { CourseListType } from '../types/course-list-type';

import { CourseType } from '../types/course-type';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public courses: Array<CourseListType> = []
  errorMessage!: string;

  constructor(
    private _courseService: CourseService
  ) { }

  ngOnInit(): void {
    this._courseService.findFullCourses()
      .pipe(
        take(1)
      )
      .subscribe((response: CourseListType[]) => {
        this.courses = response
      })
  }

  onCourseToggle(course: CourseListType): void {
    console.log(`Course was toggled ${course.isSelected ? 'close all but me' : 'close me'}`)
    if (course.isSelected) {
      this.courses.filter((inCourse: CourseListType) => inCourse.isSelected).forEach((inCourse: CourseListType) => {
        if (course.id !== inCourse.id) {
          inCourse.isSelected = false
        }
      })
    }
  }


  //Remove method course
  RemoveCourse(){
    confirm("êtes vous sûr de supprimer le cours?")
  }

  /**
   * 
   * @param  Delete student method
   */
  public deleteStudent(c: CourseListType) {
    this._courseService.delete(c.id!)
      .subscribe({
        next: (response: HttpResponse<any>) => {
          this.courses.splice(
            this.courses.indexOf(c),
            1
          )

        },
        error: (err) => {
          this.errorMessage = err;
        }

      })
  }
}
