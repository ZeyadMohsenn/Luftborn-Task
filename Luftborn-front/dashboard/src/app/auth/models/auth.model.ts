import { LoginAdminCommand } from "../../core/services/REM-api-service";

export interface LoginForWebDto extends LoginAdminCommand{
  rememberMe: boolean;
}
