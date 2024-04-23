import ResetPassword from "../components/auth/forget_password";
import SignIn from "../components/auth/signin";
import SignUp from "../components/auth/signup";
import Solo from "../views/game/solo";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";

const Ways = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Solo />} />
        <Route path="/solo" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </HashRouter>
  );
};

export default Ways;
