import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  // miFormulario: FormGroup = new FormGroup ({
  //   nombre: new FormControl('RTX 4080ti'),
  //   precio: new FormControl(250),
  //   existencias: new FormControl(5),
  // }); 

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)] ],
    precio: [null, [Validators.required, Validators.min(0)]],
    existencias: [0, Validators.min(0)]
  })

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.miFormulario.setValue({
      nombre: 'RTX 4080ti',
      precio: 350,
      existencias: 10
    })

  }

  campoNoValido(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();      
    } else {
      console.log(this.miFormulario.value)
      this.miFormulario.reset();
    }
  }
}
