import {Core} from "./core";
import {Objective} from "./objective";
import {StudentData} from "./student-data";
import {StudentPreference} from "./student-preference";
import {Interaction} from "./interaction";

export interface ScormData {
  suspend_data: string;
  launch_data: string;
  comments: string;
  comments_from_lms: string;
  core: Core;
  objectives: { [key: string]: Objective };
  student_data: StudentData;
  student_preference: StudentPreference;
  interactions: { [key: string]: Interaction };
}
