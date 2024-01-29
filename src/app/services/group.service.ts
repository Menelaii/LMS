import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.dev";
import {GroupUploadOptionsDTO} from "../interfaces/group-upload-options.dto";
import {CreateGroupRequestDTO} from "../interfaces/create-group-request.dto";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) { }


  getUploadOptions(): Observable<GroupUploadOptionsDTO> {
    return this.http.get<GroupUploadOptionsDTO>(environment.GROUP_OPTIONS_URL, {
      headers: this.tokenStorage.getAuthHeader(),
    })
  }

  create(data: CreateGroupRequestDTO): Observable<HttpResponse<any>> {
    return this.http.post(environment.GROUP_URL, data, {
      headers: this.tokenStorage.getAuthHeader(),
      observe: 'response'
    })
  }
}
