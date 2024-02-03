import {LessonDTO} from "./lesson.dto";
import {GroupShortDTO} from "./group-short.dto";

export interface TeacherLessonPageDTO {
  groups: GroupShortDTO[];
  lesson: LessonDTO;
}
