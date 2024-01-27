import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LessonPageDTO} from "../interfaces/lesson-page.dto";
import {environment} from "../../environments/environment.dev";
import {TokenStorageService} from "./token-storage.service";
import {CourseShortDTO} from "../interfaces/course-short.dto";

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
}
