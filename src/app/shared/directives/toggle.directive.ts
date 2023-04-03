import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: 'toggle'
})
export class ToggleDirective implements OnInit {
  private _nativeElement;
  private _span: any
  private _icon: string = '>'
  private _iconStaus: boolean = true

  @Input() public selectedStatus: boolean = false
  @Input() public set isExpandable(status: boolean) {
    this._iconStaus = status
    if (!status) {
      this._icon = '-'
    } else {
      this._icon = '>'
    }
  }
  @Output() public onToggle: EventEmitter<boolean> = new EventEmitter()

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2
  ) {

    this._nativeElement = _elementRef.nativeElement
  }

  ngOnInit(): void {
    this._span = this._renderer.createElement('span')
    this._span.textContent = this._icon
    this._renderer.setAttribute(this._span, 'title', `Show for ${this.selectedStatus ? 'Hide' : 'Show'}`)
    //ADD some classes to span 
    this._renderer.addClass(this._span, 'icon-list')
    this._renderer.addClass(this._span, 'up')
    this._renderer.appendChild(this._nativeElement, this._span)
  }

  @HostListener('click')
  onClick(): void {
    if (this._iconStaus) {
      console.log(`Click on ${this.selectedStatus} was detected`)
      this.selectedStatus = !this.selectedStatus
      if (this.selectedStatus) {
        this._renderer.removeClass(this._span, 'up')
        this._renderer.addClass(this._span, 'down')
      } else {
        this._renderer.addClass(this._span, 'up')
        this._renderer.removeClass(this._span, 'down')
      }
      this.onToggle.emit(this.selectedStatus)
    }
  }

}
