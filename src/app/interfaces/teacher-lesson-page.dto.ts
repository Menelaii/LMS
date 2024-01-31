import {LessonDTO} from "./lesson.dto";
import {StudentDTO} from "./student.dto";
import {ProgressDTO} from "./progress.dto";

export interface TeacherLessonPageDTO {
  progressMap: Map<number, ProgressDTO>;
  students: StudentDTO[];
  lesson: LessonDTO;
}
