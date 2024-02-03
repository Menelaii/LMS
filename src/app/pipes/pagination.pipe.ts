import { Pipe, PipeTransform } from '@angular/core';
import {PaginationService} from "../services/pagination.service";
import {Pagination} from "../interfaces/pagination";

@Pipe({
  name: 'pagination',
  standalone: true
})
export class PaginationPipe implements PipeTransform {

  constructor(
    private paginationService: PaginationService
  ) { }

  transform(value: Array<any>, pagination: Pagination): Array<any> {
    return this.paginationService.getPaginatedItems(value, pagination);
  }
}
