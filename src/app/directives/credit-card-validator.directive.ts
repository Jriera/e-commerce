import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function creditCardValidator(CC: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cardNumber = CC.test(control.value);
    return cardNumber ? null : { creditCardError: true };
  };
}

