import { getParseErrors } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)] ],
    favoritos: this.fb.array([
      ['Metal Gear'], 
      ['Death']
    ], Validators.required)
  })
 
  
  constructor(private fb: FormBuilder) { }

  nuevoFavorito: FormControl = this.fb.control('', Validators.minLength(3));

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray
  }
  
  campoNoValido(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  agregarFavorito() {
    if (this.nuevoFavorito.valid) {
      this.favoritosArr.push(this.fb.control(this.nuevoFavorito.value, Validators.minLength(3)))
    }
  }

  eliminarFavorito(i: number) {
    if (this.favoritosArr.length > i) {
      this.favoritosArr.removeAt(i)
    }
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
