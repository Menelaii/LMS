import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const zipFileValidator: ValidatorFn = (control: AbstractControl):  ValidationErrors | null => {
  const file = control.value;
  if (file) {
    const extension = file.name.split('.').pop();
    if (extension.toLowerCase() !== 'zip') {
      return { notZip: true };
    }
  }

  return null;
}

