import React, { useEffect } from "react";
// import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { userObserver } from "../auth/firebase";

export const AuthContext = createContext();

//? Custom hook oluşturduk. Bu işlem ile useContext içine AuthContext'i zaten return ettiğimiz için kullanacağımız yerde (consume)
//? direk useAuthContext'i kullanabiliriz. Örnek "Navbar" içinde mevcuttur.
// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    // setCurrentUser(JSON.parse(sessionStorage.getItem("user")));
    userObserver(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
