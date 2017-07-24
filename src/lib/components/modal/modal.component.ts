import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';

@Component({
	selector: 'cp-modal',
	template: `
	<div (click)="closeModal()" class="modal-background"></div>
	<div class="modal-content">
		<ng-content></ng-content>
	</div>
	<button (click)="closeModal()" class="modal-close is-large"></button>`,
	styleUrls: ['./modal.component.scss']
})

export class ModalComponent {
	@HostBinding('class.modal') isModal = true;
	@HostBinding('class.is-active')
  @Input() public isActive: boolean;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
	constructor() {
	  this.isActive = false;
  }
  closeModal() {
	  this.isActive = false;
	  this.onClose.emit(false);
  }
}
