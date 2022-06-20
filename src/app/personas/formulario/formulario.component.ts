import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogginService } from '../../LoggingService.service';
import { Persona } from '../../persona.model';
import { PersonasService } from '../../personas.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit{

  // @Output() personaCreada = new EventEmitter<Persona>();
  // @ViewChild('nombreInput') nombreInput: ElementRef;
  // @ViewChild('apellidoInput') apellidoInput: ElementRef;
  nombreInput: string;
  apellidoInput: string;
  index:number;
  

  constructor(
              private logginService:LogginService, 
              private personaService:PersonasService, 
              private router:Router,
              private route:ActivatedRoute
              ){
    this.personaService.saludar.subscribe(
      (indice:number) => alert("El indice de la persona es: " + indice)
    );
  }
  
    ngOnInit(){
      this.index = this.route.snapshot.params['id']
      if(this.index){
        let personaEncontrada:Persona = this.personaService.encontrarPersona(this.index);
        this.nombreInput = personaEncontrada.nombre;
        this.apellidoInput = personaEncontrada.apellido;
        console.log(this.nombreInput, this.apellidoInput)
      }
    }

  // agregarPersona(){ cambiado de nombre para mostrar otra funcionalidad
  guardarPersona(){
    let persona1 = new Persona(this.nombreInput, this.apellidoInput);
    // this.logginService.enviarMensajeAConsola("Mensaje enviado con provider desde app.module.ts");
    // this.personaCreada.emit(persona1);
    if (this.index) {
      let personaModificada = this.personaService.modificarPersona(this.index, persona1);
    }
    else{
      this.personaService.agregarPersona(persona1);
    }
    this.router.navigate(["personas"])
  }
  eliminarPersona(){
    if(this.index){
      this.personaService.eliminarPersona(this.index);
    }
    this.router.navigate(["personas"]);
  }

}
