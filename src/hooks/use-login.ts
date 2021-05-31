import Services from "../services";
import { navigate } from "@reach/router";
import { useContext, useEffect } from "react";
import { LogedInActionType, LogedInUser } from "../providers/loged-in-user";
import type { User } from "../entities/user";
import { Email } from '../entities/email';
import { Password } from '../entities/password';
import { Page } from '../entities/page';

export type Credentials = {
  email: string;
  password: string;
};

export default function useLogin(credentials: Credentials | null): User | null {
  const { loginService } = useContext(Services);
  const { dispatch, state = { user: null } } = useContext(LogedInUser);

  useEffect(() => {
    if (!credentials || !dispatch) {
      return;
    }
    try {
      loginService.login(Email.check(credentials.email), Password.check(credentials.password))
        .then((user: User) => dispatch!({ type: LogedInActionType.LOG_IN, payload: user }))
        .then(() => navigate(Page.DASHBOARD))
        .catch(e => alert(e.message));
    } catch(err) {
      alert(err.message);
    }
  }, [credentials, dispatch]);

  return state.user;
}
