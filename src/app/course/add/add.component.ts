import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  courseFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder

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
      ])

    });
  }

  addCourse(){
    console.log(this.courseFormGroup.value)
  }



}
