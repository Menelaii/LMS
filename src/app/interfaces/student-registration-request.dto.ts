import {RegistrationRequestDTO} from "./registration-request.dto";

export interface StudentRegistrationRequestDTO extends RegistrationRequestDTO {
  groupId: number;
}
