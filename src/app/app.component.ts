import { Component, OnInit } from '@angular/core';
import { LogginService } from './LoggingService.service';
import { Persona } from './persona.model';
import { PersonasService } from './personas.service';
import * as firebase from 'firebase/app';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Listado de Personas';

  // personaAgregada(persona:Persona){
  //   // this.personas.push(persona);
  //   this.personaService.agregarPersona(persona);
  // }

  constructor(private loginService:LoginService){}

  ngOnInit():void{
    firebase.initializeApp({
      apiKey: "AIzaSyB_mj6kj7B2G6WNyhjBl55aYqL5SZViMeY",
      authDomain: "listado-personas-81f23.firebaseapp.com"
    });
  }

  isAutenticado(){
    return this.loginService.isAutenticado();
  }

  salir(){
    if (this.isAutenticado()){
      this.loginService.logout();
    }
  }
  
}
