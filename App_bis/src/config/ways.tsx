import { SignIn } from "@/components/auth/signin";
import App from "@/views/App/app";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Ways = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/signin" element={<SignIn/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Ways;