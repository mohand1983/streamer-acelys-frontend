import { Component, Input, OnInit } from '@angular/core';
import { MediaType } from '../../types/media-type';

@Component({
  selector: 'app-list-media',
  templateUrl: './list-media.component.html',
  styleUrls: ['./list-media.component.scss']
})
export class ListMediaComponent implements OnInit {
  @Input() medias: MediaType[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
