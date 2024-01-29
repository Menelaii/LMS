import {LessonDTO} from "./lesson.dto";
import {AccountDTO} from "./account.dto";

export interface LessonPageDTO {
  student: AccountDTO,
  lesson: LessonDTO,
  progress: any,
  sessionId: number | undefined
}
