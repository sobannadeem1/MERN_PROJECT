import React, { useEffect } from "react";
import { useAuth } from "../store/context";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    logOut();
    navigate("/login");
  }, [logOut, navigate]);

  return null; // No need to return anything as the component will redirect
};

export default Logout;
