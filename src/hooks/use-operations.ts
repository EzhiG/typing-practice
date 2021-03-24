import Services from "../services";
import { useContext } from "react";
import type { PermittedUser, User } from "../entities/user";

export default function useOperations(user: User, currentUser: PermittedUser) {
  const { userService } = useContext(Services);
  return userService.getAvailableOperations(user, currentUser);
}
