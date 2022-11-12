import FormLoginAndRegister from "../components/Form/FormLoginAndRegister";
import useAuth from "../hooks/useAuth";

const RegisterUser = () => {
  const { registerUser, alert } = useAuth();

  return (
    <div>
      <FormLoginAndRegister
        login={false}
        functionUser={registerUser}
        alert={alert}
      />
    </div>
  );
};

export default RegisterUser;
