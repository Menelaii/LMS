import {StudentDTO} from "./student.dto";
import {ProgressDTO} from "./progress.dto";

export interface StudentProgressDTO {
  student: StudentDTO;
  progress: ProgressDTO;
}
