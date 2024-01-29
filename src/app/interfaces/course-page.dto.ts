import {CourseDTO} from "./course.dto";
import {AccountDTO} from "./account.dto";

export interface CoursePageDTO {
  course: CourseDTO;
  owner: AccountDTO;
}
