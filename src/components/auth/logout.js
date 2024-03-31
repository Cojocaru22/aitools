/*import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const navigate = useNavigate();

  useEffect(() => {
    // Attempt to sign the user out when the component mounts
    signOut(auth)
      .then(() => {
        // User successfully signed out
        console.log("User logged out successfully");
        navigate("/login");
      })
      .catch((error) => {
        // Handle any errors that occur during sign out
        console.error("Error during sign out:", error);
      });
  }, [navigate]);

  return <div>Logging out...</div>;
}

export default LogOut;
*/
