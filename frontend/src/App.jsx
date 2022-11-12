import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import { OperationProvider } from "./context/OperationContext";

// Auth path
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/LoginUser";
import Register from "./pages/RegisterUser";
import ForgotPass from "./pages/ForgotPass";
import NewPass from "./pages/NewPass";

// Private path
import PrivateLayout from "./layout/PrivateLayout";
import Home from "./pages/HomeUser";
import History from "./pages/HistoryUser";
import Profile from "./pages/ProfileUser";
import ConfirmAccount from "./pages/ConfirmAccount";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OperationProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />

              <Route path="sign-in" element={<Register />} />

              <Route path="forgot-password" element={<ForgotPass />} />

              <Route path="new-password/:token" element={<NewPass />} />

              <Route
                path="confirm-account/:token"
                element={<ConfirmAccount />}
              />
            </Route>
            

            <Route path="/home" element={<PrivateLayout />}>
              <Route index element={<Home />} />

              <Route path="transactions" element={<History />} />

              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </OperationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
