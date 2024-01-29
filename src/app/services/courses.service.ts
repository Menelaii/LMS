import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.dev";
import {TokenStorageService} from "./token-storage.service";
import {CourseShortDTO} from "../interfaces/course-short.dto";
import {CourseUploadDTO} from "../interfaces/course-upload.dto";
import {CoursePageDTO} from "../interfaces/course-page.dto";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  getAvailableCourses(): Observable<CourseShortDTO[]> {
    return this.http.get<CourseShortDTO[]>(environment.COURSES_URL, {
      headers: this.tokenStorage.getAuthHeader()
    })
  }

  getOwnedCourses(): Observable<CourseShortDTO[]> {
    return this.http.get<CourseShortDTO[]>(environment.OWNED_COURSES_URL, {
      headers: this.tokenStorage.getAuthHeader()
    })
  }

  upload(data: CourseUploadDTO): Observable<HttpResponse<any>> {
    return this.http.post(environment.COURSES_URL, data, {
      headers: this.tokenStorage.getAuthHeader(),
      observe: 'response'
    })
  }

  getById(id: number): Observable<CoursePageDTO> {
    return this.http.get<CoursePageDTO>(environment.COURSES_URL, {
      headers: this.tokenStorage.getAuthHeader()
    })
  }
}
