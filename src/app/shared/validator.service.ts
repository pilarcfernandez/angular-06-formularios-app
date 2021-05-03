import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  public nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  noPuedesSerStrider(control: FormControl): ValidationErrors | null {
    const valor: string = control.value?.trim().toLowerCase();
    console.log(valor);
    if (valor === 'strider') {
      return { nostrider: true }
    }
    return null;
  }

  camposIguales(campo1: string, campo2: string) {
    return (control: FormGroup): ValidationErrors | null => {
      const pass1 = control.get(campo1)?.value;
      const pass2 = control.get(campo2)?.value;

      if (pass1 === pass2) {
        control.get(campo2)?.setErrors(null)
        return null;
      } else {
        const error = {'noIguales' : true};
        control.get(campo2)?.setErrors(error)
        return error;
      }      
    }
  }


}
