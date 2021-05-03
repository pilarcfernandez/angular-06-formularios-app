import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorsvc.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsvc.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorsvc.noPuedesSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', [Validators.required]]
  }, {
    validators: [this.validatorsvc.camposIguales('password', 'passwordConfirm')]
  })

  constructor(private fb: FormBuilder, private validatorsvc: ValidatorService, private emailValidator: EmailValidatorService) { }

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    let msg = ''
    if (errors?.required) {
      msg = 'El email es obligatorio';
    } else if (errors?.pattern) {
      msg = 'El formato no es correcto';
    } else if (errors?.emailUsado) {
      msg = 'El correo electrónico ya está en uso'
    }
    return ''
  }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Pilar Fernandez',
      email: 'test@test.com',
      username: 'miusername',
      password: '123456',
      passwordConfirm: '123456'
    })
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  validEmail() {
    return this.miFormulario.get('email')?.errors?.required && this.miFormulario.get('email')?.touched;
  }


  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }
}
