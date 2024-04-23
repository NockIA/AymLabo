import ResetPassword from "../components/auth/forget_password";
import SignIn from "../components/auth/signin";
import SignUp from "../components/auth/signup";
import Solo from "../views/game/solo";
import { HashRouter, Route, Routes } from "react-router-dom";

const Ways: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/solo" element={<Solo />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </HashRouter>
  );
};

export default Ways;
