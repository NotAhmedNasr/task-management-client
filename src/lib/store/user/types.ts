export interface AppUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  blocked: boolean;
}

export interface UserState {
  token: string | null;
  user: AppUser | null;
}
