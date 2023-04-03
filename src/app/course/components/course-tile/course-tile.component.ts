import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { CourseListType } from '../../types/course-list-type';
import { MediaType } from '../../types/media-type';

@Component({
  selector: 'app-course-tile',
  templateUrl: './course-tile.component.html',
  styleUrls: ['./course-tile.component.scss']
})
export class CourseTileComponent implements OnInit {
  @Input() public course!: CourseListType
  @Output() public onToggle: EventEmitter<boolean> = new EventEmitter()
  @Input() medias: MediaType[] = []
  public courses: Array<CourseListType> = []
  errorMessage!: string;
  @Output() onToggleCourse: EventEmitter<CourseListType> = new EventEmitter();

  constructor(private _courseService: CourseService) { }

  ngOnInit(): void {
  }

  public revealOrHide(course: CourseListType): void {
    course.isSelected = !course.isSelected
    console.log(`Course was toggled : ${course.isSelected}`)
    this.onToggleCourse.emit(course)
  }

  public toggle(courseStatus: boolean): void{
    this.course.isSelected=courseStatus
    this.onToggleCourse.emit(this.course)
  }



   //Remove method course
   /*RemoveCourse(){
    confirm("êtes vous sûr de supprimer le cours?")
  }*/

  /**
   * 
   * @param  Delete student method
   */
  public RemoveCourse(c: CourseListType) {
    
    //console.log("ok")
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
