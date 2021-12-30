import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-error-printer',
  templateUrl: './input-error-printer.component.html',
  styleUrls: ['./input-error-printer.component.scss']
})
export class InputErrorPrinterComponent implements OnInit {

  @Input("control")
  control: AbstractControl | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
