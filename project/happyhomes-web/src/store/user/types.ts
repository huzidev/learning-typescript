import { UserRole } from '@store/auth/types';
import { ActionType, BaseHTTPResponse, PaginationMeta, SortType, SubState } from '@store/types';

export interface UserState {
  meState: SubState;
  idsState: { [id: number]: UserIDSubState };
  list: UserListState;
  createState: SubState;
  getMe: () => void;
  updateMe: (data: UpdateByMeReq) => void;

  create: (data: CreateUserReq) => void;
  getList: (page: number, filters?: UserFiltersReq) => void;

  getById: (id: number) => void;
  updateById: (id: number, data: UpdateByIdReq) => void;
  removeById: (id: number) => void;
  resetIdState: () => void;
}

export interface UserListState extends SubState {
  data?: UserDetail[];
  meta?: PaginationMeta;
}

export interface UserActionResult extends BaseHTTPResponse {
  data: UserDetail;
}

export interface UserIDSubState extends SubState, BaseHTTPResponse {
  data?: UserDetail;
  action?: ActionType;
}

export interface UserDetail {
  isActive: boolean;
  isBanned: boolean;
  isVerified: boolean;
  isTheme: boolean;
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  rememberMeToken?: string;
  google?: string;
  facebook?: null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserReq {
  name: string;
  email: string;
  google?: string;
  facebook?: string;
  role: UserRole;
  password: string;
  passwordConfirmation: string;
  isVerified?: boolean;
}

export interface UpdateByIdReq {
  name?: string;
  email?: string;
  google?: string;
  facebook?: string;
  role?: UserRole;
  password?: string;
  passwordConfirmation?: string;
  isVerified?: boolean;
  isActive?: boolean;
  isBanned?: boolean;
}

export interface UpdateByMeReq {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
}

export interface UserFiltersReq {
  name?: string;
  email?: string;
  google?: string;
  facebook?: string;
  role?: UserRole;
  isActive?: boolean;
  isBanned?: boolean;
  createdAtBefore?: string;
  createdAtAfter?: string;
  updatedAtBefore?: string;
  updatedAtAfter?: string;
  sort?: UserSortReq;
}

export interface UserSortReq {
  name?: SortType;
  email?: SortType;
  google?: SortType;
  facebook?: SortType;
  role?: SortType;
  isActive?: SortType;
  isBanned?: SortType;
  createdAt?: SortType;
  updatedAt?: SortType;
}
