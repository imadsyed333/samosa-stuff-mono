import { FieldErrors, User } from "../lib/types";

export type AuthResponse = {
  message?: string;
  error?: string;
  fieldErrors?: FieldErrors;
};

export type LoginResponse = {
  user?: User;
  error?: string;
};

export type ProfileResponse = {
  user: User;
};

export type EmailResponse = {
  emailExists: boolean;
};
