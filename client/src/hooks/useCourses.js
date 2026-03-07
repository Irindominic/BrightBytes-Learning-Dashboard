import { useApi } from "./useApi";
import { getCourses } from "../utils/api";

export function useCourses() {
  return useApi(getCourses);
}
