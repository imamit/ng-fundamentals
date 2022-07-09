import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { IUser } from "./user.model";

@Injectable()
export class AuthService {
    logout() {
      const options = {headers: new HttpHeaders({'Conent-Type': 'application/json'})}  
      return this.http.post(`/api/logout`, {}, options)
    }
    checkAuthenticationStatus() {
      this.http.get('/api/currentIdentity')
        .pipe(tap(data => {
            if(data instanceof Object) {
                this.currentUser = <IUser>data
            }
        }))
        .subscribe()
    }
    currentUser:IUser

    constructor(private http:HttpClient) {}
    
    login(userName: string, password: string) {

        const loginInfo = {username: userName, password: password};
        const options = {headers: new HttpHeaders({'Conent-Type': 'application/json'})}

        return this.http.post('/api/login',loginInfo,options)
            .pipe(tap(data => {
                this.currentUser = <IUser>data['user'];
            }))
            .pipe(catchError(err=>{
                return of(false)
            }))
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    updateCurrentUser(firstName:string, lastName:string) {
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName

        const options = {headers: new HttpHeaders({'Conent-Type': 'application/json'})}

        return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options)
    }
}