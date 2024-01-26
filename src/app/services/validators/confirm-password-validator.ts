import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const confirmPassword: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
  let pass = group.get('password')?.value;
  let confirmPass = group.get('confirmPassword')?.value
  return pass === confirmPass ? null : { notSame: true }
}
