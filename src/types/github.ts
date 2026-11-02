export type GithubUser = {
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  html_url: string
  followers: number
  following: number
  public_repos: number
  location: string | null
  company: string | null
}
