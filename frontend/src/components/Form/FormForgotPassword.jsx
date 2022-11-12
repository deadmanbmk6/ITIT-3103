import React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import InputsForm from "../InputsForm/InputsForm";
import ButtonForm from "../Buttons/ButtonForm";
import exp_reg from "../../helpers/Exp_reg";
import AlertAuth from "../Alerts/AlertAuth";
import AlertInputs from "../Alerts/AlertInputs";
import LinkAuth from "../Link/LinkAuth";

const FormForgotPassword = ({ sendEmail, functionUser, alert }) => {
  const { email_exp, pass_exp } = exp_reg;

  return (
    <>
      <div className="shadow-2xl bg-gray-100 p-5 md:p-16  w-full sm:w-2/3 xl:w-1/3 py-16 mt-10 mx-auto border-2 border-sky-600">
        <Formik
          initialValues={{
            email: "",
            password: "",
            newPassword: "",
          }}
          validate={({ email, password, newPassword }) => {
            let errors = {};

            if (!sendEmail) {
              if (!password) {
                errors.password =
                  "Password must contain at least 6 characters and must contain at least one capital letter and one numeric character. ";
              } else if (!pass_exp.test(password)) {
                errors.password =
                  "Password must contain at least 6 characters and must contain at least one capital letter and one numeric character. ";
              }

              if (newPassword !== password) {
                errors.newPassword = "Passwords are not the same.";
              }
            } else {
              if (!email) {
                errors.email = "Enter a valid email.";
              } else if (!email_exp.test(email)) {
                errors.email = "Enter a valid email.";
              }
            }

            return errors;
          }}
          onSubmit={async (values, { resetForm }) => {
            const emailtoLowerCase = values.email.toLowerCase();

            console.log(values.password);

            functionUser({
              email: emailtoLowerCase,
              password: values.password,
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            handleBlur,
          }) => (
            <form
              action=""
              onSubmit={handleSubmit}
              className="flex flex-col gap-8"
            >
              {alert.msg && <AlertAuth text={alert.msg} error={alert.error} />}

              <div className="flex flex-col gap-2 text-center">
                <h2 className="text-center font-bold uppercase text-xl underline-offset-1 underline">
                  {sendEmail ? "send email with instructions" : "new password"}
                </h2>

                <p className="">
                  {sendEmail
                    ? "Regain your Access and DO NOT lose your account."
                    : "Reset your password and DO NOT lose access to your account."}
                </p>
              </div>

              {sendEmail ? (
                <div>
                  <InputsForm
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                    touched={touched.email}
                    error={errors.email}
                    onBlur={handleBlur}
                    placeholder="Your Email"
                  />

                  <div className="mt-1">
                    {errors.email && touched.email && (
                      <AlertInputs error={errors.email} />
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  <div>
                    <InputsForm
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      name="password"
                      touched={touched.password}
                      error={errors.password}
                      onBlur={handleBlur}
                      placeholder="Your password"
                    />
                    <div className="mt-1">
                      {errors.password && touched.password && (
                        <AlertInputs error={errors.password} />
                      )}
                    </div>
                  </div>

                  <div>
                    <InputsForm
                      type="password"
                      value={values.newPassword}
                      onChange={handleChange}
                      name="newPassword"
                      touched={touched.newPassword}
                      error={errors.newPassword}
                      onBlur={handleBlur}
                      placeholder="Repeat password"
                    />
                    <div className="mt-1">
                      {errors.newPassword && touched.newPassword && (
                        <AlertInputs error={errors.newPassword} />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {sendEmail ? (
                <ButtonForm text="Send Instructions" />
              ) : (
                <ButtonForm text="New password" />
              )}

              <div className=" text-center">
                {sendEmail && (
                  <div>
                    <LinkAuth
                      text={"Don't have an account? "}
                      text2="Create one now"
                      nav={"/sign-in"}
                    />

                    <LinkAuth
                      text={"You have an account? "}
                      text2="Login now"
                      nav={"/"}
                    />
                  </div>
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default FormForgotPassword;
