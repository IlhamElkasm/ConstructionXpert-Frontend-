import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jwt } from '../models/Jwt';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = "http://localhost:8765/api/v1/auth";

  
  constructor(private http: HttpClient, private router: Router) { }

  register(singRequest: any): Observable<Jwt> {
    return this.http.post<Jwt>(`${this.BASE_URL}/register`, singRequest);
}

login(loginRequest:any): Observable<Jwt>{
  return this.http.post<Jwt>(`${this.BASE_URL}/authenticate`, loginRequest)
}
}
