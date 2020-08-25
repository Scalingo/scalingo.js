export interface User {
  id: string
  email: string
  username: string
  uuid: string
  company: string
  location: string
  fullname: string

  /** Github profile of the user */
  github: GithubProfile

  /** Did the user accept our TOS */
  tos_accepted: boolean
}

export interface GithubProfile {
  /** Github Username */
  username: string
  /** Email linked to this Github account */
  email?: string

  avatar_url: string
  profile_url: string
}
