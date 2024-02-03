import {StudentDTO} from "./student.dto";
import {ScormData} from "./scorm/scorm-data";

export interface StudentDetailedProgressDTO {
  student: StudentDTO;
  rawProgress?: ScormData;
}
