import React, { useState, useEffect } from "react";
import { createContext } from "react";
// import Axios from "../config/Axios";
import Axios from "axios";
import checkToken from "../helpers/checkToken";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const [loading, setLoading] = useState(true);

  const [alert, setAlert] = useState({});

  const token = localStorage.getItem("token_user000123040501");

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const authUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await Axios(
          "http://localhost:4000/profile",
          checkToken(token)
        );

        setAuth(data);
      } catch (error) {
        setAuth({});

        return {
          msg: error?.response.data.msg,
          error: true,
        };
      }

      setLoading(false);
    };

    authUser();
  }, []);

  const loginUser = async ({ email, password }) => {
    try {
      const { data } = await Axios.post("http://localhost:4000/login", {
        email,
        password,
      });

      localStorage.setItem("token_user000123040501", data.token);

      setAuth(data);

      window.location.href = "/home";
    } catch (error) {
      setAlert({
        msg: error?.response.data.msg,
        error: true,
      });

      setTimeout(() => {
        setAlert({});
      }, 5000);
    }
  };

  const registerUser = async ({ name, email, password }) => {
    try {
      console.log("hh");
      console.log({ name, email, password });
      const { data } = await Axios.post(
        "http://localhost:4000/register-users",
        {
          name,
          email,
          password,
        }
      );

      setAlert({
        msg: "Your account was created successfully!, Now you can login",
        error: false,
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      setAlert({
        msg: error?.response.data.msg,
        error: true,
      });

      return;
    }
  };

  const editProfile = async (values) => {
    console.log(values);

    try {
      const { data } = await Axios.put(
        `http://localhost:4000/edit-profile/${values.id}`,
        values,
        checkToken(token)
      );

      console.log(data);

      await MySwal.fire({
        position: "top-end",
        icon: "success",
        title: "Your account was successfully edited!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setAlert({
        msg: error?.response.data.msg,
        error: true,
      });

      setTimeout(() => {
        setAlert({});
      }, 3000);
    }
  };

  const sendEmailToConfirmAccount = async (id) => {
    try {
      const { data } = await Axios.post(
        `/confirm-account/${id}`,
        {},
        checkToken(token)
      );

      setAlert({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlert({});
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBudget = async ({ id, budget }) => {
    try {
      const { data } = await Axios.put(
        `http://localhost:4000/update-budget/${id}`,
        { budget },
        checkToken(token)
      );

      setAuth(data);

      await MySwal.fire({
        position: "top-end",
        icon: "success",
        title: "Congratulations change made successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);

      return;
    }
  };

  const sendEmailToRecoverPassword = async (value) => {
    try {
      console.log("hey sai 1111111111111111111111111");
      const { data } = await Axios.post("/forgot-password", value);

      setAlert({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlert({});
      }, 4000);
    } catch (error) {
      setAlert({
        msg: error?.response.data.msg,
        error: true,
      });

      setTimeout(() => {
        setAlert({});
      }, 4000);
    }
  };

  const logOut = async () => {
    MySwal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token_user000123040501");

        setAuth({});

        return;
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        loginUser,
        updateBudget,
        sendEmailToConfirmAccount,
        editProfile,
        sendEmailToRecoverPassword,
        logOut,
        setAuth,
        setAlert,
        auth,
        loading,
        alert,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
