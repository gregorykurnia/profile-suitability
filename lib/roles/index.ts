import * as serviceCrew from "./service-crew";
import * as pizzaCook from "./pizza-cook";
import * as shiftManager from "./shift-manager";
import * as bankTeller from "./bank-teller";
import * as customerServiceOfficer from "./customer-service-officer";
import * as salesExecutive from "./sales-executive";
import * as financeOfficer from "./finance-officer";
import * as softwareEngineer from "./software-engineer";
import * as projectManager from "./project-manager";
import * as managementTrainee from "./management-trainee";
import type { RoleDefinition } from "./types";

export const roleRegistry = {
  "Service Crew": serviceCrew,
  "Pizza Cook": pizzaCook,
  "Shift Manager": shiftManager,
  "Bank Teller": bankTeller,
  "Customer Service Officer": customerServiceOfficer,
  "Sales Executive": salesExecutive,
  "Finance Officer": financeOfficer,
  "Software Engineer": softwareEngineer,
  "Project Manager": projectManager,
  "Management Trainee": managementTrainee,
} satisfies Record<string, RoleDefinition>;

export type RoleName = keyof typeof roleRegistry;

export function getRoleDefinition(roleName: string): RoleDefinition {
  if (!Object.hasOwn(roleRegistry, roleName)) {
    throw new Error(`Unregistered demo role: ${JSON.stringify(roleName)}.`);
  }
  return roleRegistry[roleName as RoleName];
}
