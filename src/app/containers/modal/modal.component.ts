import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../lib/components/modal/modal.component";

@Component({
	selector: 'demo-modal',
	templateUrl: './modal.component.html'
})

export class DemoModalComponent implements AfterViewInit, OnDestroy {
  public onClose$;
  isActive = false;
  openModal() {
    this.isActive = true;
  }
  @ViewChild(ModalComponent) modal: ModalComponent;
  ngAfterViewInit() {
    this.onClose$ = this.modal.onClose.subscribe((x) => {
      this.isActive = x;
      return x;
    })
  }
  ngOnDestroy() {
    this.onClose$.unsubscribe();
  }
}
