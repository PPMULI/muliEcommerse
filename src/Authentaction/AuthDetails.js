import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Config";

function AuthDetails() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
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
     }).catch((error) => console.log(error))
  }
  return (
    <>
      <div>{authUser ? <p>Sign in</p> : <button onClick={userSignOut}>Sign out</button> }</div>
    </>
  );
}

export default AuthDetails;
