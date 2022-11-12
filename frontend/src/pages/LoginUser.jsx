import FormLoginAndRegister from "../components/Form/FormLoginAndRegister";
import useAuth from "../hooks/useAuth";

const LoginUser = () => {
  const { loginUser, alert } = useAuth();

  return (
    <div>
      <FormLoginAndRegister
        login={true}
        functionUser={loginUser}
        alert={alert}
      />
    </div>
  );
};

export default LoginUser;
