import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { CourseService } from '../services/course.service';
import { CourseType } from '../types/course-type';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  courseFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _courseService: CourseService

  ) { }

  ngOnInit(): void {

    this.courseFormGroup = this.fb.group({
      title: this.fb.control(null,
      [
        Validators.required,
        Validators.minLength(4)
      ]),
      objective: this.fb.control("", 
      [
        Validators.required,
        Validators.minLength(4)
      ]),
      createdAt: this.fb.control(new Date(), 
      [
        Validators.required
      ])

    });
  }

  addCourse(){
    //console.log(this.courseFormGroup.value)
    this._courseService.add(this.courseFormGroup.value)
    .pipe(
      take(1)
      ).subscribe()
    

  }



}
