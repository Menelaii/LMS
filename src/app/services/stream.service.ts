import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.dev";
import {CreateStreamRequestDTO} from "../interfaces/create-stream-request.dto";

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  create(data: CreateStreamRequestDTO): Observable<HttpResponse<any>> {
    return this.http.post(environment.STREAMS_URL, data, {
      headers: this.tokenStorage.getAuthHeader(),
      observe: 'response'
    })
  }
}
