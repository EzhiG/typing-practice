import { useContext } from "react";
import { LogedInUser } from "../providers/loged-in-user";
import type { User } from "../entities/user";
import { navigate } from "@reach/router";
import { Page } from '../entities/page';

export default function useCurrentUser(): User | null {
  const { state: { user } = { user: null } } = useContext(LogedInUser);
  if (user === null) {
    navigate(Page.LOGIN);
  }

  return user;
}

