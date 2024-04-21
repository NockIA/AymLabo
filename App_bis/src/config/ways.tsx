import App from "@/views/App/app";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Ways = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Ways;