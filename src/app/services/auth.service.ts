import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jwt } from '../models/Jwt';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginData } from '../models/LoginData';
import { RegisterData } from '../models/RegisterData';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = "http://192.168.1.46:8765/api/v1/auth";
  private readonly TOKEN_KEY = 'token';


  constructor(
     private http: HttpClient,
     private router: Router,
     private jwtHelper: JwtHelperService
    ) { }


  register(registerdata: RegisterData): Observable<Jwt> {
    return this.http.post<Jwt>(`${this.BASE_URL}/register`, registerdata);
}

login(logindata:LoginData): Observable<Jwt>{
  return this.http.post<Jwt>(`${this.BASE_URL}/authenticate`, logindata)
}

logout(): void {
  localStorage.removeItem(this.TOKEN_KEY);
}



isAuthenticated(): boolean {
  const token = localStorage.getItem(this.TOKEN_KEY);
  return token != null && !this.jwtHelper.isTokenExpired(token);
}

getToken(): string | null {
  return localStorage.getItem(this.TOKEN_KEY);
}





}
