import {GroupShortDTO} from "./group-short.dto";
import {StudentProgressDTO} from "./student-progress.dto";
import {LessonDTO} from "./lesson.dto";

export interface GroupProgressPageDTO {
  lesson: LessonDTO;
  group: GroupShortDTO;
  progress: StudentProgressDTO[];
}
