import { Component, Input, OnInit } from '@angular/core';
import { Persona } from '../../persona.model';
import { PersonasService } from '../../personas.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  @Input() persona_hijo: Persona;
  @Input() indice_hijo: number;

  constructor(private personaService:PersonasService) { }

  ngOnInit(): void {
  }

  emitirSaludo(){
    this.personaService.saludar.emit(this.indice_hijo);
  }

}
