import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormForgotPassword from "../components/Form/FormForgotPassword";
import Axios from "../config/Axios";
import useAuth from "../hooks/useAuth";

const NewPass = () => {
  const { alert, setAlert } = useAuth();

  const [validToken, setValidToken] = useState(false);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {
        await Axios(`/forgot-password/${token}`);

        setValidToken(true);
      } catch (error) {
        console.log(error);

        setAlert({
          msg: "There was an error in the link",
          error: true,
        });
      }

      setLoading(false);
    };

    checkToken();
  }, []);

  const newPassword = async (value) => {
    try {
      const { data } = await Axios.post(`/forgot-password/${token}`, value);

      setAlert({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 2500);
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

  if (loading) return "loading";

  return (
    <>
      {validToken ? (
        <FormForgotPassword
          sendEmail={false}
          functionUser={newPassword}
          alert={alert}
        />
      ) : (
        <h1 className="text-center uppercase text-2xl text-red-700">
          There was an error in the link
        </h1>
      )}
    </>
  );
};

export default NewPass;
