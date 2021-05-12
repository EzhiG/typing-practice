import { useContext } from "react";
import { navigate } from "@reach/router";
import Services from "../services";
import type { User } from "../entities/user";

export default function useOperations(user: User, currentUser: User) {
  const { userService } = useContext(Services);
  try {
    return userService.getAvailableOperations(user, currentUser);
  } catch (err) {
    navigate('/login').then(() => alert(err));
  }
}
