import { useContext } from "react";
import Services from "../services";
import type { User } from "../entities/user";

export default function useOperations(user: User, currentUser: User) {
  const { userService } = useContext(Services);
  return userService.getAvailableOperations(user, currentUser);
}
