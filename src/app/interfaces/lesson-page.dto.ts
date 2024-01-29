import {LessonDTO} from "./lesson.dto";
import {AccountDto} from "./account.dto";

export interface LessonPageDTO {
  student: AccountDto,
  lesson: LessonDTO,
  progress: any,
  sessionId: number | undefined
}
