export interface SigninFormProps {
  login: string;
  password: string;
}

export interface SignupFormProps {
  username: string;
  email: string;
  password: string;
}

export interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
  other?: string;
}
