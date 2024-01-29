import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {environment} from "../../environments/environment.dev";
import {EnrollmentDTO} from "../interfaces/enrollment.dto";
import {Observable} from "rxjs";
import {EnrollmentTargetDTO} from "../interfaces/enrollment-target.dto";

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  enrollStudent(enrollmentDTO: EnrollmentDTO): Observable<HttpResponse<any>> {
    return this.enroll(
      environment.STUDENT_ENROLLMENT_URL,
      'studentId',
      enrollmentDTO
    );
  }

  enrollGroup(enrollmentDTO: EnrollmentDTO) {
    return this.enroll(
      environment.GROUP_ENROLLMENT_URL,
      'groupId',
      enrollmentDTO
    );
  }

  enrollStream(enrollmentDTO: EnrollmentDTO) {
    return this.enroll(
      environment.STREAM_ENROLLMENT_URL,
      'streamId',
      enrollmentDTO
    );
  }

  getEnrollmentTargets(accessLevel: number): Observable<EnrollmentTargetDTO[]> {
    return this.http.get<EnrollmentTargetDTO[]>(environment.ENROLLMENT_OPTIONS_URL, {
      headers: this.tokenStorage.getAuthHeader(),
      params: {accessLevel: accessLevel}
    })
  }

  private enroll(url: string, entityIdName: string, enrollmentDTO: EnrollmentDTO): Observable<HttpResponse<any>> {
    let params: any = {};
    params.courseId = enrollmentDTO.courseId.toString()
    params[entityIdName] = enrollmentDTO.entityId.toString();

    return this.http.post(url, null, {
      headers: this.tokenStorage.getAuthHeader(),
      params: params,
      observe: 'response'
    })
  }
}
