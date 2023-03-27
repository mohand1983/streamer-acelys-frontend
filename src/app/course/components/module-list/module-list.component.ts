import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModuleListType } from '../../types/module-list-type';
import { ModuleType } from '../../types/module-type';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit {
  @Input() public module!: ModuleListType
  @Output() public onToggleCourse: EventEmitter<ModuleListType> = new EventEmitter()

  @Input() modules: ModuleType[] = []

  constructor() { }

  ngOnInit(): void {
  }
  public revealOrHide(module: ModuleListType): void {
    module.isSelected = !module.isSelected
    console.log(`Course was toggled : ${module.isSelected}`)
    //this.onToggleModule.emit(module)
  }

}
