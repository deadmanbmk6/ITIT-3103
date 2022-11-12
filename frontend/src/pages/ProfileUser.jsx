import React from "react";
import FormConfirmAccount from "../components/Form/FormConfirmAccount";
import FormEditAccount from "../components/Form/FormEditAccount";
import useAuth from "../hooks/useAuth";

const ProfileUser = () => {
  const { auth, sendEmailToConfirmAccount, alert, editProfile } = useAuth();

  return (
    <div className="shadow-2xl p-5 w-full sm:w-2/3 xl:w-1/3 mx-auto rounded-md">
      <h1 className="text-center uppercase text-teal-900 font-bold text-2xl">
        Edit your profile
      </h1>

      {!auth.confirmed ? (
        <div className="shadow-lg p-2 bg-slate-50 font-medium rounded-md mt-5">
          <p className="text-center text-orange-800">
            Your account is limited! You can only add 5 transactions in total.
            Confirm your account and so you can add many more.
          </p>

          <FormConfirmAccount
            id={auth._id}
            sendEmailToConfirmAccount={sendEmailToConfirmAccount}
            alert={alert}
          />
        </div>
      ) : (
        <p className="text-center text-green-500 font-semibold">
          Congratulations your account is confirmed.
        </p>
      )}

      <div className="md:p-0 p-5">
        <FormEditAccount
          name={auth.name}
          email={auth.email}
          editProfile={editProfile}
          id={auth._id}
          alert={alert}
        />
      </div>
    </div>
  );
};

export default ProfileUser;
