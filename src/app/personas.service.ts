import { EventEmitter, Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { LogginService } from "./LoggingService.service";
import { Persona } from "./persona.model";

@Injectable()
export class PersonasService{
    personas:Persona[] = [];
    
    constructor(private logginService:LogginService, private dataService:DataService){}
    
    saludar = new EventEmitter<number>();
    
    agregarPersona(persona:Persona){
        this.logginService.enviarMensajeAConsola("Agregamos persona " + persona.nombre + " " + persona.apellido);
        if (this.personas == null) {
            this.personas = [];
        }
        this.personas.push(persona);
        this.dataService.guardarPersonas(this.personas)
    }
    
    encontrarPersona(index:number):Persona{
        return this.personas[index];
    }
    
    modificarPersona(index:number, persona:Persona){
        this.personas[index].nombre = persona.nombre;
        this.personas[index].apellido = persona.apellido;
        this.dataService.editarPersona(index, persona);
    }

    eliminarPersona(index:number) {
      this.personas.splice(index, 1);
      this.dataService.borrarPersona(index);
      //Se vuelve a guardar el arreglo para recuperar los indices
      this.reguardarPersonas();
    }
    reguardarPersonas(){
        if (this.personas != null) {
            this.dataService.guardarPersonas(this.personas);
        }
    }

    obtenerPersonas(){
        return this.dataService.cargarPersonas();
    }

    setPersonas(personas:Persona[]){
        this.personas = personas;
    }
}