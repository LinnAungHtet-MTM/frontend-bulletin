import api, { setAccessToken } from "@/provider/api";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

type Role = "admin" | "member";

interface AuthContextType {
  isAuthenticated: boolean;
  role: Role | null;
  checked: boolean;
  setAuth: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  role: null,
  checked: false,
  setAuth: () => { },
  logout: () => { },
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checked, setChecked] = useState(false);
  const [role, setRole] = useState<Role | null>(null);

  const parseJwt = (token: string): { role: boolean } => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  };

  const setAuth = (token: string) => {
    const payload = parseJwt(token);
    setAccessToken(token);
    const mappedRole = payload.role ? "member" : "admin";
    setRole(mappedRole);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setAccessToken(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    api
      .post("/auth/refresh")
      .then((res) => setAuth(res.data.access_token))
      .catch(logout)
      .finally(() => setChecked(true));
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, checked, role, setAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
