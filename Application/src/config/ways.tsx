import Profile from "../views/profile/profile";
import ResetPassword from "../components/auth/forget_password";
import SignIn from "../components/auth/signin";
import SignUp from "../components/auth/signup";
import Solo from "../views/game/solo";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../views/home/home";

const Ways: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
       
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/solo" element={<Solo />} />
        <Route path='/home' element={<Home/>}/>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </HashRouter>
  );
};

export default Ways;
