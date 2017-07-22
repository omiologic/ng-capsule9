import { TestBed, async } from '@angular/core/testing';
import { ColumnsComponent } from './columns.component';


describe('ColumnsComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ColumnsComponent
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ColumnsComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
      });
  }));
  it('Should create the columns', async(() => {
    expect(component).toBeTruthy();
    const isClassIncluded = fixture.nativeElement.className.includes('columns');
    expect(isClassIncluded).toBeTruthy();
  }));
  describe('Setter options(config: ColumnsConfig)', () => {
    const testCases = [
      { class: 'is-centered', option: 'centered' },
      { class: 'is-vcentered', option: 'vcentered' },
      { class: 'is-mobile', option: 'mobile' },
      { class: 'is-desktop', option: 'desktop' },
      { class: 'is-multiline', option: 'multiline' },
      { class: 'is-grid', option: 'grid' },
      { class: 'is-gapless', option: 'gapless' },
    ];
    for (let i = 0; i < testCases.length; i++) {
      it(`Should set class "${testCases[i].class}" when "${testCases[i].option}" is set to true`, () => {
        const option = {};
        option[testCases[i].option] = true;
        component.options = option;
        fixture.detectChanges();
        // console.log('fixture:', fixture.nativeElement.classList.value.includes('is-centered'));
        const isClassIncluded = fixture.nativeElement.className.includes(testCases[i].class);
        expect(isClassIncluded).toBeTruthy();
      });
    }


  });
})

