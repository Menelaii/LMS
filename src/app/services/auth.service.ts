import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.dev";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {AuthRequestDTO} from "../interfaces/auth-request.dto";
import {AuthResponseDTO} from "../interfaces/auth-response.dto";
import {jwtDecode} from "jwt-decode";
import {JwtPayload} from "../interfaces/jwt-payload";
import {StudentDTO} from "../interfaces/student.dto";
import {TeacherDTO} from "../interfaces/teacher.dto";

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

  public getAuthenticatedStudent():Observable<StudentDTO> {
    return this.http.get<StudentDTO>(environment.STUDENT_ME_URL, {
      headers: this.storage.getAuthHeader()
    })
  }

  public getAuthenticatedTeacher():Observable<TeacherDTO> {
    return this.http.get<TeacherDTO>(environment.TEACHER_ME_URL, {
      headers: this.storage.getAuthHeader()
    })
  }

  public isAuthenticated():boolean {
    return this.storage.getToken() != null && !this.storage.isTokenExpired();
  }

  public getRole(): string {
    const token = this.storage.getToken();
    return token ? jwtDecode<JwtPayload>(token).role : environment.ROLE_ANONYMOUS;
  }

  public isAuthenticatedAs(role: string): boolean {
    return this.isAuthenticated() && this.getRole() === role;
  }
}
