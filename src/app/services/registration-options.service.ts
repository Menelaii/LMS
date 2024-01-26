import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StudentRegistrationOptionsDTO} from "../interfaces/student-registration-options.dto";
import {environment} from "../../environments/environment.dev";

@Injectable({
  providedIn: 'root'
})
export class RegistrationOptionsService {

  constructor(private http: HttpClient) { }

  getStudentRegistrationOptions(): Observable<StudentRegistrationOptionsDTO> {
    return this.http.get<StudentRegistrationOptionsDTO>(environment.STUDENT_REGISTRATION_OPTIONS_URL);
  }
}
