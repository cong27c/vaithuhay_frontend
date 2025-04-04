import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import Loading from "~/layouts/DefaultLayout/components/Loading";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <>
        {loading && <Loading />}
        {children}
      </>
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
