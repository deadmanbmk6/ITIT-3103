import { Outlet, Navigate } from "react-router-dom";

import Header from "../components/Header/HeaderMain";

import useAuth from "../hooks/useAuth";
import useOperation from "../hooks/useOperation";

const PrivateLayout = () => {
  const { auth, loading, logOut } = useAuth();

  const { loadingOper } = useOperation();

  if (loading) return "loading";

  if (loadingOper) return "loading";

  return (
    <>
      <Header money={auth.budget} img={auth.img} logOut={logOut} />

      {auth?._id ? (
        <main className="container mx-auto mt-13">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default PrivateLayout;
