import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";
import { Persona } from "./persona.model";


@Injectable()
export class DataService{
    constructor(private httpClient:HttpClient, private loginService:LoginService){}

    guardarPersonas(personas:Persona[]){
        const token = this.loginService.getToken();
        this.httpClient.put("https://listado-personas-81f23-default-rtdb.firebaseio.com/datos.json?auth=" + token, personas)
        .subscribe(
            response => console.log("Resultado guardar personas: " + response),
            error => console.log("Error guardar personas: " + error)
        );
    }

    cargarPersonas(){
        const token = this.loginService.getToken();
        return this.httpClient.get("https://listado-personas-81f23-default-rtdb.firebaseio.com/datos.json?auth=" + token);
    }

    editarPersona(indice:number, persona:Persona){
        const token = this.loginService.getToken();
        let url:string = "https://listado-personas-81f23-default-rtdb.firebaseio.com/datos/" + indice + ".json?auth=" + token;
        this.httpClient.put(url, persona)
        .subscribe(
            (response) => {console.log("Resultado modificar persona: " + response)},
            (error) => {console.log("Error modificar persona: " + error)}
        );
    }

    borrarPersona(indice:number){
        const token = this.loginService.getToken();
        this.httpClient.delete("https://listado-personas-81f23-default-rtdb.firebaseio.com/datos/" + indice + ".json?auth=" + token)
        .subscribe(
            response => console.log("Respuesta de borrado: " + response),
            error => console.log("Error de borrado: " + error)
        );
    }
}