import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useAlert } from "../../contexts/AlertContext";

export default function Logout() {
  const { setUser } = useContext(UserContext);
  const { addAlert } = useAlert();
  const navigate = useNavigate();


  
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser({ username: "", token: "" });
    navigate("/login");
    addAlert("success", 'Logged out.')
  },[]);

  return <></>;
}
