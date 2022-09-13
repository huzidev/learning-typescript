import { roles, UserRole } from '@store/auth/types';

export function hasPermission(allowedRole?: UserRole, myRole?: UserRole): boolean {
  if (!myRole || !allowedRole) {
    return false;
  }
  // means what every myRole(current loggedIn user role is) it (MUST) have to be greater than OR equal to allowedRole therefore we don't have to givePermission to super-admins specifically rather we just gives permission to admin because super-admin role is greater than admin's role
  // because super-admin role will always be greater than allowedRole as allowedRole for many places is as greater than 2 which is of admin and role of super-admin is 3 which is greater than allowed role
  // in brief if at some place we've provide permission to only client then permission for realtor, admin and super-admin will automatically be provided because their's role are greater than the role of client
  return roles.indexOf(myRole) >= roles.indexOf(allowedRole);
}

export function mapLink(lat: number, lng: number): string {
  // in the URL it'll directly linked us to the longitude and latitude figures
  return `http://maps.google.com/?q=${lat},${lng}`;
}
