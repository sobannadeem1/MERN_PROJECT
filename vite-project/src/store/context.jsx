import React, { createContext, useContext, useState, useEffect } from "react";

export const GenerateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [isloggedin, setIsLoggedin] = useState(false);
  const [users, setUsers] = useState("");

  const generatetoken = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedin(true);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setIsLoggedin(false);
  };

  const useAuthentication = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:8000/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        setUsers(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedin(true);
    }
  }, []);

  useEffect(() => {
    if (isloggedin) {
      useAuthentication();
    }
  }, [isloggedin]);

  return (
    <GenerateContext.Provider
      value={{ isloggedin, generatetoken, logOut, users }}
    >
      {children}
    </GenerateContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(GenerateContext);
};
