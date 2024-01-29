import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TokenStorageService} from "./token-storage.service";
import {environment} from "../../environments/environment.dev";
import {LessonPageDTO} from "../interfaces/lesson-page.dto";
import {Observable} from "rxjs";
import {LessonUploadOptionsDTO} from "../interfaces/lesson-upload-options.dto";
import {LessonUploadDTO} from "../interfaces/lesson-upload.dto";

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getLessonPage(id: number): Observable<LessonPageDTO> {
    return this.http.get<LessonPageDTO>(`${environment.LESSONS_URL}/${id}`, {
      headers: this.tokenStorage.getAuthHeader()
    })
  }

  getUploadOptions(): Observable<LessonUploadOptionsDTO> {
    return this.http.get<LessonUploadOptionsDTO>(environment.LESSONS_OPTIONS_URL, {
      headers: this.tokenStorage.getAuthHeader()
    })
  }

  uploadLesson(dto: LessonUploadDTO, archive: File): Observable<HttpResponse<any>> {
    // if (archive.type !== 'application/zip') {
    //   throw new Error('Не поддерживаемый формат архива');
    // }

    const formData = new FormData();
    formData.append('dto', new Blob([JSON.stringify(dto)], {
      type: 'application/json'
    }));
    formData.append('archive', new Blob([archive], {
      type: 'application/zip'
    }));

    return this.http.post(environment.LESSONS_URL, formData, {
      headers: this.tokenStorage.getAuthHeader(),
      observe: 'response'
    });
  }
}
