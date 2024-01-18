import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.dev";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {AuthRequestDTO} from "../interfaces/auth-request.dto";
import {AuthResponseDTO} from "../interfaces/auth-response.dto";

@Injectable({
  providedIn: 'root'
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
}
