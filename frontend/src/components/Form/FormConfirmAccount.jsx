import { Formik } from "formik";
import React from "react";
import AlertAuth from "../Alerts/AlertAuth";

const FormConfirmAccount = ({ id, sendEmailToConfirmAccount, alert }) => {
  return (
    <>
      <Formik
        initialValues={{
          id: id,
        }}
        onSubmit={({ id }) => {
          sendEmailToConfirmAccount(id);
        }}
      >
        {({ handleSubmit }) => (
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 py-3"
          >
            <div className="mx-auto">
              <button
                className="px-4 p-2 bg-red-500 rounded-lg text-gray-100 font-bold uppercase hover:bg-red-600 duration-100"
                type="submit"
              >
                Send an email to confirm
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FormConfirmAccount;
