import {LessonDTO} from "./lesson.dto";
import {StudentDTO} from "./student.dto";

export interface LessonPageDTO {
  student: StudentDTO,
  lesson: LessonDTO,
  progress: string
}
