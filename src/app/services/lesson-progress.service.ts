import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {LessonPageDTO} from "../interfaces/lesson-page.dto";
import {environment} from "../../environments/environment.dev";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";

@Injectable()
export class LessonProgressService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  }

  saveProgress(lessonId: number, progress: any): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.LESSON_PROGRESS_URL}/${lessonId}`, progress,{
      headers: this.tokenStorage.getAuthHeader(),
      observe: 'response'
    })
  }
}
