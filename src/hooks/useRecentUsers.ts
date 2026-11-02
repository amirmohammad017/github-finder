import { useCallback, useState } from "react";
import { MAX_RECENT_USERS, RECENT_USERS_KEY } from "../constants/storage";
const readUsers = (): string[] => {
  try {
    const value = JSON.parse(localStorage.getItem(RECENT_USERS_KEY) || "[]");
    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
};
export function useRecentUsers() {
  const [recentUsers, setRecentUsers] = useState(readUsers);
  const addRecentUser = useCallback(
    (login: string) => {
      const next = [
        login,
        ...recentUsers.filter((item) => item !== login),
      ].slice(0, MAX_RECENT_USERS);
      setRecentUsers(next);
      localStorage.setItem(RECENT_USERS_KEY, JSON.stringify(next));
    },
    [recentUsers],
  );
  return { recentUsers, addRecentUser };
}
