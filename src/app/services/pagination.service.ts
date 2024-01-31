import { Injectable } from '@angular/core';
import {Pagination} from "../interfaces/pagination";

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  getPaginatedItems(items: Array<any>, pagination: Pagination): Array<any> {
    const startIndex = (pagination.page - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    return items.slice(startIndex, endIndex);
  }
}
