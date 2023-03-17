import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseListType } from '../../types/course-list-type';

import { CourseTileComponent } from './course-tile.component';

describe('CourseTileComponent', () => {
  let component: CourseTileComponent;
  let fixture: ComponentFixture<CourseTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTileComponent);
    component = fixture.componentInstance;
    component.course =   {
      id: 1,
      title: "SQL",
      objective: "Querying and managing a Relational Database",
      createdAt: new Date(2023, 1, 12),
      updatedAt: new Date(2023, 1, 12),
      isSelected: false,
      modules: [
        {
          id: 1,
          name: "DDL",
          objective: "Use DDL to manage tables, relations, constraints, ..."
        },
        {
          id: 2,
          name: "DML",
          objective: "Use DML to add, remove, update and select datas from a RDBMS"
        }
      ]
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
