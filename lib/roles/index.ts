import * as serviceCrew from "./service-crew";
import * as pizzaCook from "./pizza-cook";
import * as shiftManager from "./shift-manager";
import * as bankTeller from "./bank-teller";
import type { RoleDefinition } from "./types";

export const roleRegistry = {
  "Service Crew": serviceCrew,
  "Pizza Cook": pizzaCook,
  "Shift Manager": shiftManager,
  "Bank Teller": bankTeller,
} satisfies Record<string, RoleDefinition>;

export type RoleName = keyof typeof roleRegistry;

export function getRoleDefinition(roleName: string): RoleDefinition {
  if (!Object.hasOwn(roleRegistry, roleName)) {
    throw new Error(`Unregistered demo role: ${JSON.stringify(roleName)}.`);
  }
  return roleRegistry[roleName as RoleName];
}
