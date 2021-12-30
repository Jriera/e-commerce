import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputErrorPrinterComponent } from './input-error-printer.component';

describe('InputErrorPrinterComponent', () => {
  let component: InputErrorPrinterComponent;
  let fixture: ComponentFixture<InputErrorPrinterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputErrorPrinterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputErrorPrinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
