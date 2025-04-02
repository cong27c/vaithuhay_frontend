import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import authServices from "~/Services/authServices";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authServices.getCurrentUser();
        setUser(data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const values = {
    user,
    isLoading,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
//   value: PropTypes.shape(authValuePropTypes).isRequired,
// };

export function useAuth() {
  return useContext(AuthContext);
}
