import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.dev";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {AuthRequestDTO} from "../interfaces/auth-request.dto";
import {AuthResponseDTO} from "../interfaces/auth-response.dto";
import {jwtDecode} from "jwt-decode";
import {JwtPayload} from "../interfaces/jwt-payload";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private storage: TokenStorageService,
    private http: HttpClient
  ) {}

  public signIn(auth:AuthRequestDTO):Observable<AuthResponseDTO | null> {
    return this.http.post<AuthResponseDTO>(environment.SIGN_IN_URL, auth)
  }

  public signOut() {
    this.storage.setToken(null);
  }

  public isAuthenticated():boolean {
    return this.storage.getToken() != null && !this.storage.isTokenExpired();
  }

  public getRole(): string {
    return jwtDecode<JwtPayload>(this.storage.getToken() ?? '').role;
  }

  public isAuthenticatedAs(role: string): boolean {
    return this.isAuthenticated() && this.getRole() === role;
  }
}
