import {CorrectResponse} from "./correct-response";
import {Objective} from "./objective";

export interface Interaction {
  id: string;
  time: string;
  type: string;
  weighting: string;
  student_response: string;
  result: string;
  latency: string;
  objectives: { [key: string]: Objective };
  correct_responses: { [key: string]: CorrectResponse };
}
