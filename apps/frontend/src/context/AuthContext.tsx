import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FieldErrors, User } from "../lib/types";
import {
  loginUser,
  logoutUser,
  registerUser,
  userProfile,
} from "../api/authClient";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  register: Function;
  login: Function;
  logout: Function;
  fieldErrors: FieldErrors;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  register: () => {},
  login: () => {},
  logout: () => {},
  fieldErrors: {},
});

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    userProfile()
      .then((res) => {
        setUser(res.user);
      })
      .catch((e) => {
        console.log(e);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    registerUser(email, password, name)
      .then((res) => {
        console.log(res.message);
        setFieldErrors({});
        navigate("/login");
      })
      .catch((err: AxiosError<FieldErrors>) => {
        console.log(err.response?.data);
        setFieldErrors(err.response?.data || {});
      })
      .finally(() => setLoading(false));
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    loginUser(email, password)
      .then((res) => {
        if (res.user) {
          setUser(res.user);
          setFieldErrors({});
          navigate("/");
        }
      })
      .catch((err: AxiosError<{ error: String }>) => {
        const errorMessage = err.response?.data.error;
        setFieldErrors({ error: errorMessage });
      })
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    logoutUser()
      .then((res) => {
        setUser(null);
        navigate("/");
      })
      .catch((e) => console.log(e));
  };

  const value = useMemo(
    () => ({ user, loading, register, login, logout, fieldErrors }),
    [user, fieldErrors]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
