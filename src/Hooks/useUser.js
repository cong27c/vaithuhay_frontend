const { use } = require("react");
const { useAuth } = require("@/contexts/AuthContext");

function useUser() {
  const user = useAuth();
  return user;
}
