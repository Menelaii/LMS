import { Injectable } from '@angular/core';
import {StudentDTO} from "../interfaces/student.dto";

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() { }

  getCourseUrl() {
    return '/assets/1/scormdriver/indexAPI.html';
  }

  getUserFresh(): StudentDTO {
    return {
      studentId: 1,
      studentName: "Васька",
      progress: undefined
    }
  }

  getUserWithProgress(): StudentDTO {
    return {
      studentId: 1,
      studentName: "Васька",
      progress: this.getProgress()
    }
  }

  getProgress() {
    return {
      "suspend_data": "{\"v\":2,\"d\":[123,34,112,114,111,103,114,101,115,115,34,58,256,108,263,115,111,110,265,267,34,48,266,256,99,266,49,44,257,281,48,48,283,105,278,276,290,280,58,282,34,289,275,277,275,293,49,125,303,283,49,292,281,288,290,299,279,281,125,305,307,294,314,34,50,316,302,283,51,321,303,318,320,300,308,296,310,325,304,34,324,329,294,309,298,333,318,52,321,339,256,311,34,301,318,306,337,322,319,325,323,355,34,343,352,318,53,341,283,362,352,345,291,360,334,54,344,331,340,369,326,315,275,112,266,52,287,373,346,372,297,384,375,377,312,338,383,368,390,302,334,328,256,386,334,336,398,278,334,359,402,267,326,334,379,58,54,303],\"cpv\":\"LaAmKqNK\"}",
      "launch_data": "",
      "comments": "",
      "comments_from_lms": "",
      "core": {
        "student_id": "2",
        "student_name": "Андрей",
        "lesson_location": "index.html#/lessons/zGGiBxpAM3wThff5Gh4dKz6WMosGgNRU",
        "credit": "",
        "lesson_status": "incomplete",
        "entry": "",
        "lesson_mode": "normal",
        "exit": "suspend",
        "session_time": "00:00:00",
        "score": {
          "raw": "",
          "min": "",
          "max": "100"
        }
      },
      "objectives": {},
      "student_data": {
        "mastery_score": "",
        "max_time_allowed": "",
        "time_limit_action": ""
      },
      "student_preference": {
        "audio": "",
        "language": "",
        "speed": "",
        "text": ""
      },
      "interactions": {}
    };
  }
}
