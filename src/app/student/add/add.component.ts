import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ToastService } from 'src/app/core/toast.service';
import { IStudent } from '../interfaces/i-student';
import { StudentModel } from '../models/student-model';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  public form: FormGroup = new FormGroup({})
  public student: StudentModel = new StudentModel()
   
  constructor(
    private _formBuilder: FormBuilder,
    private _service: StudentService,
    private _snackBar: ToastService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      lastName: [
        '', // Default value
        [
          Validators.required
        ] // Validators function to add to this field
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        ]
      ],
      firstName: [''],
      phoneNumber: [''],
      login: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        ]
      ]
    })
  }

  public get c(): {[key: string]: AbstractControl} {
    return this.form.controls
  }

  public onSubmit(): void {
    this._service.add(this.form.value)
    .pipe(
      take(1)
    )
    .pipe(
      take(1)
    ).subscribe({
      next: (response: IStudent) => {
        this._snackBar.show(
          `Student ${response.lastName} was created`
        )
        this._router.navigate(['/', 'student', 'list'])
      },
      error: (badRequest: any) => {
        this._snackBar.cssClass = 'failed'
        if (badRequest.status === 409) {
          
          this._snackBar.show(
            badRequest.error.reason,
            'Got it!'
          )
  
          this.form.controls[badRequest.error.attribute].setValue('')
        } else {
          this._snackBar.show(
            `Something went wrong while processing`,
            'Got it!'
          )
        }

      }
    })
  }

}
