import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { Persona } from '../persona.model';
import { PersonasService } from '../personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  
  personas:Persona[] = [];

  constructor(private personaService:PersonasService, private router:Router){}

  ngOnInit(): void {
    // Completar el código: no funciona la Subscripcion del observable que devuelve el firebase
    this.personaService.obtenerPersonas()
    .subscribe(
      (personas:any) => {
        this.personas = personas;
        this.personaService.setPersonas(personas);
      }
    );
  }
  agregar(){
    this.router.navigate(["personas/agregar"])
  }
}
