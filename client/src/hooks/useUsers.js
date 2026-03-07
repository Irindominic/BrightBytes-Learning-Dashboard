import { useApi } from "./useApi";
import { getUsers } from "../utils/api";

export function useUsers() {
  return useApi(getUsers);
}
