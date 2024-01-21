import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment.dev";

@Injectable({
  providedIn: "root"
})
export class UrlChangerService {

  transformUrlForProxy(url: string): string {
    return `${environment.CLIENT_DOMAIN}/${url.slice(environment.BACKEND_DOMAIN.length + 1)}`;
  }
}
