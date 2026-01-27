import api from "./api";
import {
  AuthResponse,
  EmailResponse,
  LoginResponse,
  ProfileResponse,
} from "./responseTypes";

export const registerUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const res = await api.post<AuthResponse>("/user/register", {
      email,
      password,
      name,
    });
    return res.data;
  } catch (e) {
    console.error("Error signing up:", e);
    throw e;
  }
};

export const verifyEmail = async (email: string) => {
  try {
    const res = await api.post<EmailResponse>("/user/email-check", { email });
    return res.data.emailExists;
  } catch (e) {
    console.error("Error verifying email:", e);
    throw e;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await api.post<LoginResponse>("/user/login", {
      email,
      password,
    });
    return res.data;
  } catch (e) {
    console.error("Error logging in:", e);
    throw e;
  }
};

export const refreshUser = async () => {
  try {
    const res = await api.post<AuthResponse>("/user/refresh");
    return res.data;
  } catch (e) {
    console.error("Error refreshing session:", e);
    throw e;
  }
};

export const logoutUser = async () => {
  try {
    const res = await api.post<AuthResponse>("/user/logout");
    return res.data;
  } catch (e) {
    console.error("Error logging out:", e);
    throw e;
  }
};

export const userProfile = async () => {
  try {
    const res = await api.get<ProfileResponse>("/user/profile");
    return res.data;
  } catch (e) {
    console.error("Error fetching user profile:", e);
    throw e;
  }
};
