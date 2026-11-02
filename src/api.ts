import type { GithubUser } from "./types/github";
export type { GithubUser } from "./types/github";

const headers = (): HeadersInit => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  return token
    ? {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      }
    : { Accept: "application/vnd.github+json" };
};

async function github<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: { ...headers(), ...init?.headers },
  });
  if (!response.ok)
    throw new Error(
      response.status === 403
        ? "GitHub API rate limit reached."
        : `GitHub request failed (${response.status}).`,
    );
  return response.json() as Promise<T>;
}

export const searchUsers = async (term: string) =>
  (
    await github<{ items: GithubUser[] }>(
      `/search/users?q=${encodeURIComponent(term)}&per_page=5`,
    )
  ).items;

export const getUser = (login: string) =>
  github<GithubUser>(`/users/${encodeURIComponent(login)}`);

export const isFollowing = (login: string) =>
  github<unknown>(`/user/following/${encodeURIComponent(login)}`)
    .then(() => true)
    .catch((error: Error & { message?: string }) =>
      error.message?.includes("404") ? false : false,
    );

export const followUser = (login: string) =>
  github(`/user/following/${encodeURIComponent(login)}`, {
    method: "PUT",
    body: JSON.stringify({}),
  }).then(() => true);

export const unfollowUser = (login: string) =>
  github(`/user/following/${encodeURIComponent(login)}`, {
    method: "DELETE",
  }).then(() => true);
