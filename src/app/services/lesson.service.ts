import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TokenStorageService} from "./token-storage.service";
import {environment} from "../../environments/environment.dev";
import {LessonPageDTO} from "../interfaces/lesson-page.dto";
import {Observable} from "rxjs";

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
}
