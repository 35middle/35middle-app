export interface UserSession {
  _id?: string;
  accountId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface BasePageProps {
  userSession?: UserSession;
}
