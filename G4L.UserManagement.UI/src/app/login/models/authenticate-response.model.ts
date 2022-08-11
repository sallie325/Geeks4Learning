import { Career } from "src/app/shared/enums/career";
import { Role } from "src/app/shared/enums/role";

export interface AuthenticateResponse {
  name: string;
  surname: string;
  career: Career;
  role: Role;
  email: string;
  token: string;
}
