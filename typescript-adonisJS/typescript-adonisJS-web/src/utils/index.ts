import { roles, UserRole } from '@store/auth/types';

export function hasPermission(allowedRole?: UserRole, myRole?: UserRole): boolean {
  if (!myRole || !allowedRole) {
    return false;
  }
  return roles.indexOf(myRole) >= roles.indexOf(allowedRole);
}

export function mapLink(lat: number, lng: number): string {
  return `http://maps.google.com/?q=${lat},${lng}`;
}
