import {Score} from "./score";

export interface Core {
  student_id: number;
  student_name: string;
  lesson_location: string;
  credit: string;
  lesson_status: string;
  entry: string;
  lesson_mode: string;
  exit: string;
  session_time: string;
  total_time: string;
  score: Score;
}
