import React from "react";
import FormForgotPassword from "../components/Form/FormForgotPassword";
import useAuth from "../hooks/useAuth";

const ForgotPass = () => {
  const { alert, sendEmailToRecoverPassword } = useAuth();
  return (
    <>
      <FormForgotPassword
        sendEmail={true}
        functionUser={sendEmailToRecoverPassword}
        alert={alert}
      />
    </>
  );
};

export default ForgotPass;
