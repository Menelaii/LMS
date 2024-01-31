import {StreamShortDTO} from "./stream-short.dto";
import {GroupShortDTO} from "./group-short.dto";

export interface GroupDTO extends GroupShortDTO {
  stream: StreamShortDTO;
}
