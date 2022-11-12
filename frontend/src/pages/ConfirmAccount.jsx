import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlertAuth from "../components/Alerts/AlertAuth";
import Axios from "../config/Axios";

const ConfirmAccount = () => {
  const [Loading, setLoading] = useState(true);
  const [alert, setAlert] = useState();
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const accountConfirmed = async () => {
      try {
        const url = `/confirm-account/${token}`;
        const { data } = await Axios(url);

        setAlert({
          msg: data.msg,
          error: false,
        });

        setLoading(false);

        setTimeout(() => {
          window.location.href = "/home";
        }, 1000);

        return;
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }

      setLoading(false);
    };

    accountConfirmed();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-700 font-black text-3xl text-center">
          Confirm your account
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow lg px-5 py-10 rounded-lg bg-white md:w-2/3 lg:w-1/3 mx-auto">
        {!Loading && <AlertAuth text={alert.msg} error={alert.error} />}
      </div>
    </>
  );
};

export default ConfirmAccount;
