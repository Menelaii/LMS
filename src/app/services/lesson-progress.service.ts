import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.dev";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {SaveProgressRequestDTO} from "../interfaces/save-progress-request.dto";
import {GroupProgressPageDTO} from "../interfaces/group-progress-page.dto";
import {StudentDetailedProgressDTO} from "../interfaces/student-detailed-progress.dto";

@Injectable({
  providedIn: 'root'
})
export class LessonProgressService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  }

  saveProgress(lessonId: number, requestDTO: SaveProgressRequestDTO, cachedAuthHeader: HttpHeaders): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.LESSON_PROGRESS_ME_URL}/${lessonId}`, requestDTO,{
      headers: cachedAuthHeader,
      observe: 'response'
    })
  }

  getGroupProgress(groupId: number, lessonId: number): Observable<GroupProgressPageDTO> {
    return this.http.get<GroupProgressPageDTO>(
      `${environment.LESSON_PROGRESS_URL}/groups/${groupId}/${lessonId}`, {
      headers: this.tokenStorage.getAuthHeader(),
    });
  }

  getStudentDetailedProgress(studentId: number, lessonId: number): Observable<StudentDetailedProgressDTO> {
    return this.http.get<StudentDetailedProgressDTO>(
      `${environment.LESSON_PROGRESS_URL}/students/${studentId}/${lessonId}/raw`, {
      headers: this.tokenStorage.getAuthHeader(),
    });
  }
}
