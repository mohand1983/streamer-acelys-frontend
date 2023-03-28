import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseListType } from '../../types/course-list-type';
import { MediaType } from '../../types/media-type';

@Component({
  selector: 'app-course-tile',
  templateUrl: './course-tile.component.html',
  styleUrls: ['./course-tile.component.scss']
})
export class CourseTileComponent implements OnInit {
  @Input() public course!: CourseListType
  @Output() public onToggleCourse: EventEmitter<CourseListType> = new EventEmitter()
  @Input() medias: MediaType[] = []

  constructor() { }

  ngOnInit(): void {
  }

  public revealOrHide(course: CourseListType): void {
    course.isSelected = !course.isSelected
    console.log(`Course was toggled : ${course.isSelected}`)
    this.onToggleCourse.emit(course)
  }
}
