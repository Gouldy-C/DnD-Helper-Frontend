//import reactLogo from './assets/react.svg'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FooterComp from "./components/FooterComp";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/authPages/LoginPage";
import Logout from "./pages/authPages/Logout";
import SignUpPage from "./pages/authPages/SignUpPage";
import NavbarComp from "./components/NavbarComp";
import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import { verifyAccessToken } from "./utils/accessTokenTools";
import ResetRequestPage from "./pages/authPages/ResetRequestPage";
import ResetPasswordPage from "./pages/authPages/ResetPasswordPage";
import AlertsContainer from "./components/AlertsContainer";
import CharacterBuilderPage from "./pages/CharacterBuilderPage";

export default function App() {
  const { setUser } = useContext(UserContext);

  async function checkToken() {
    if (await verifyAccessToken()) {
      setUser({
        username: JSON.parse(localStorage.getItem("username") as string),
        token: JSON.parse(localStorage.getItem("token") as string),
      });
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <BrowserRouter>
      <div className="container relative flex flex-col min-h-screen bg-gray-800">
        <NavbarComp />
        <AlertsContainer />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/reset-request" element={<ResetRequestPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/character-builder/*" element={<CharacterBuilderPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <FooterComp />
      </div>
    </BrowserRouter>
  );
}
