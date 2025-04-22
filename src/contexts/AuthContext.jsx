import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import authServices, { getCurrentUser } from "~/Services/authServices";
import { useDispatch } from "react-redux";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authServices.getCurrentUser();
        setUser(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [dispatch]);

  const values = {
    user,
    setUser,
    isLoading,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
