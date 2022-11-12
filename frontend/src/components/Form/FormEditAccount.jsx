import { Formik } from "formik";
import React from "react";
import AlertInputs from "../Alerts/AlertInputs";
import ButtonForm from "../Buttons/ButtonForm";
import InputsForm from "../InputsForm/InputsForm";
import exp_reg from "../../helpers/Exp_reg";
import AlertAuth from "../Alerts/AlertAuth";

const FormEditAccount = ({ img, name, email, editProfile, id, alert }) => {
  const { email_exp, name_exp } = exp_reg;

  return (
    <>
      <Formik
        initialValues={{
          name: name,
          email: email,
        }}
        validate={({ email, name }) => {
          let errors = {};

          if (!email) {
            errors.email = "Enter a valid email.";
          } else if (!email_exp.test(email)) {
            errors.email = "Enter a valid email.";
          }

          if (!name) {
            errors.name = "Enter a valid name.";
          } else if (!name_exp.test(name)) {
            errors.name = "Enter a valid name.";
          }

          return errors;
        }}
        onSubmit={(value) => {
          const { name, email } = value;

          const values = { email, name, id };

          editProfile(values);
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
            className="flex flex-col gap-6 py-10 "
          >
            {alert.msg && <AlertAuth text={alert.msg} error={alert.error} />}

            <div className="flex items-center gap-2 mx-auto">
              <div className="h-14 w-14 md:h-20 md:w-20 overflow-hidden shadow-2xl border-2 border-orange-500 rounded-full">
                {img === "img" || img == undefined ? (
                  <img
                    src="https://res.cloudinary.com/dkxm9njd6/image/upload/v1656799468/user_fjmynn.png"
                    alt=""
                    className=" object-cover"
                  />
                ) : (
                  <img src={img.url} alt="" className=" object-cover" />
                )}
              </div>

              <div className="w-2/3">
                <InputsForm
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  name="name"
                  touched={touched.name}
                  error={errors.name}
                  onBlur={handleBlur}
                  placeholder="Your Name"
                />
                <div className="mt-1">
                  {errors.name && touched.name && (
                    <AlertInputs error={errors.name} />
                  )}
                </div>
              </div>
            </div>

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

            <ButtonForm text="Save" />
          </form>
        )}
      </Formik>
    </>
  );
};

export default FormEditAccount;
