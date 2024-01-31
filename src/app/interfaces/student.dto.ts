import {AccountDTO} from "./account.dto";
import {GroupDTO} from "./group.dto";

export interface StudentDTO extends AccountDTO {
  group: GroupDTO
}
