import { useAuth } from "~/contexts/AuthContext";

function useLoading() {
  const loading = useAuth().isLoading;
  return loading;
}

export default useLoading;
