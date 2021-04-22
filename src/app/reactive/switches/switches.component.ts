import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  
  ngOnInit() {
    this.miFormulario.reset({...this.persona, terminos: true});
       
    this.miFormulario.valueChanges.subscribe(( {terminos, ...rest}) => {
      this.persona = rest;
    })
    // this.miFormulario.valueChanges.subscribe(form => { 
    //   delete form.terminos;
    //   this.persona = {...form};
    
    // })
  }

  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true],
    terminos: [true, Validators.requiredTrue]
  })

  persona = {
    genero: 'F',
    notificaciones: true
  }

  guardar() {
    const formValue = {...this.miFormulario.value};
    delete formValue.terminos;
    console.log(formValue)
  }

}
