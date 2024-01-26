import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {TeacherRegistrationRequestDTO} from "../interfaces/teacher-registration-request.dto";
import {StudentRegistrationRequestDTO} from "../interfaces/student-registration-request.dto";
import {environment} from "../../environments/environment.dev";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  registerStudent(registrationRequest: StudentRegistrationRequestDTO): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(environment.STUDENT_REGISTRATION_URL, registrationRequest, {
      headers: this.tokenStorage.getAuthHeader(),
      observe: 'response'
    })
  }

  registerTeacher(registrationRequest: TeacherRegistrationRequestDTO): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(environment.TEACHER_REGISTRATION_URL, registrationRequest, {
      headers: this.tokenStorage.getAuthHeader(),
      observe: 'response'
    })
  }
}
