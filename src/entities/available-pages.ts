import { Role } from "./role";
import type { User } from "./user";
import { Page } from './page';

export const AVAILABLE_PAGES = {
  [Role.CLIENT]: [Page.LOGIN],
  [Role.ADMIN]: [Page.LOGIN, Page.DASHBOARD],
  [Role.MODERATOR]: [Page.LOGIN, Page.DASHBOARD],
};

export type AvailablePages = typeof AVAILABLE_PAGES;
export type AvailablePagesByRole<U extends User> = AvailablePages[U['role']];
