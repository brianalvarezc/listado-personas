import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";
import {signInWithEmailAndPassword, getAuth, getIdToken, signOut} from "firebase/auth";


@Injectable()
export class LoginService{
    private token:string;

    constructor(private router:Router){}

    login(email:string, password:string){
        signInWithEmailAndPassword(getAuth(), email, password).
        then(userCredential => {
            const user = userCredential.user;
            getIdToken(user)
            .then(token => {
                this.token = token;
                // console.log(token);
                this.router.navigate(["/"]);
            });
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Codigo Error: "+ errorCode);
            console.log("Mensaje Error: " + errorMessage);
        });

    }

    getToken(){
        return this.token;
    }

    isAutenticado(){
        return this.token != null;
    }

    logout(){
        signOut(getAuth()).then(() => {
            this.router.navigate(["/login"])
        });
    }
}