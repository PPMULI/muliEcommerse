import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Config";

function AuthDetails() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
        listen()
    }
  }, []);

  const userSignOut = () => {
    signOut(auth).then(() => {
        console.log("sign out successful")
    }).catch((error) => console.log(error))
  }
  return (
    <>
      <div>{authUser ? <p>Sign in</p> : <button onClick={userSignOut}>Sign out</button> }</div>
    </>
  );
}

export default AuthDetails;
