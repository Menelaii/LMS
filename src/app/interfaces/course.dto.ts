import {CourseShortDTO} from "./course-short.dto";
import {LessonShortDTO} from "./lesson-short.dto";

export interface CourseDTO extends CourseShortDTO {
  lessons: LessonShortDTO[];
}
