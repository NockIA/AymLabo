import ResetPassword from "@/components/auth/forget_password";
import SignIn from "@/components/auth/signin";
import SignUp from "@/components/auth/signup";
import App from "@/views/App/app";
import Solo from "@/views/game/solo";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Ways = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Solo />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Ways;
