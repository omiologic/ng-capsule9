import { TestBed, async } from '@angular/core/testing';
import { ColumnsComponent } from './columns.component';

describe('ColumnsComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
		  declarations: [
		    ColumnsComponent
		  ]
		}).compileComponents();
	}));
	it('Should create the columns', async(() => {
		const fixture = TestBed.createComponent(ColumnsComponent);
		const component = fixture.debugElement.componentInstance;

		expect(component).toBeTruthy();
	}));
})

