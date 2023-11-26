import React, { useRef, useState } from "react";

import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { userIcon } from "../utils/constants";

const Forms = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [message, setMessage] = useState("");
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const errmessage = checkValidData(
      email.current.value,
      password.current.value
      // name.current.value
    );

    setMessage(errmessage);

    if (errmessage) return null;

    //sign In sign Up logic
    if (!isSignInForm) {
      //sign Up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // console.log(user);
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: userIcon,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // Profile updated!
              // ...
            })
            .catch((error) => {
              setMessage(error.message);
            });
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          setMessage(errorMessage);
        });
    } else {
      // Sign In logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          // const user = userCredential.user;
          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          // const errorMessage = error.message;
          setMessage(errorCode);
        });
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="absolute w-[90%] md:w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-md bg-opacity-90"
    >
      <p className="text-3xl px-2 font-bold py-4 ">
        {isSignInForm ? "Sign In" : "Sign Up"}
      </p>
      {!isSignInForm && (
        <input
          ref={name}
          type="text"
          placeholder="Full Name"
          className="p-4 m-2 w-full rounded-md text-[#757575] bg-[#333333]"
        />
      )}

      <input
        ref={email}
        type="text"
        placeholder="Email or phone number"
        autoComplete="username"
        className="p-4 m-2 w-full rounded-md text-[#757575] bg-[#333333]"
      />

      <input
        ref={password}
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        className="p-4 m-2 w-full rounded-md bg-[#333333] text-[#757575]"
      />

      <p className=" text-[#e27905]  px-2">{message}</p>
      <button
        className="p-4 m-2 my-4 font-bold bg-[#e50815] w-full rounded-md"
        onClick={() => handleButtonClick()}
      >
        {isSignInForm ? "Sign In" : "Sign Up"}
      </button>

      <p
        className="p-4 mt-10 text-[#757575] cursor-pointer"
        onClick={() => toggleSignInForm()}
      >
        {isSignInForm
          ? "New to Netflix? Sign up now."
          : "Already Registered ? Sign In Now"}
      </p>
    </form>
  );
};

export default Forms;
