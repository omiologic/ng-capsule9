import { TestBed, async } from '@angular/core/testing';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let fixture;
  let component;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalComponent
      ]
    }).compileComponents()
      .then(() => {
      fixture = TestBed.createComponent(ModalComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      });
  }));
  it('Should create the modal', async(() => {
    expect(component).toBeTruthy();
    const isClassIncluded = fixture.nativeElement.className.includes('modal');
    expect(isClassIncluded).toBeTruthy();
  }));
  describe('closeModal()', () => {
    it('Should set isActive to false', () => {
      component.isActive = true;
      component.closeModal();
      fixture.detectChanges();
      expect(component.isActive).toBeFalsy();
    })
    it('Should emit onClose', () => {
      const spy = spyOn(component.onClose, 'emit');
      component.closeModal();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(false);
    })
  })
});
