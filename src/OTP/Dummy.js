import React, { useState } from "react";
import { auth, RecaptchaVerifier } from "../Authetication/Config"; // Import your Firebase config
import { signInWithPhoneNumber } from "firebase/auth";

function OTPForm() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const configureRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "sign-in-button",
        {
          size: "invisible",
          callback: (response) => {
            console.log("Captcha solved");
          },
          defaultCountry: "IN",
        },
        auth
      );
    }
  };

  const sendOTP = (e) => {
    e.preventDefault();
    configureRecaptcha();
    const phoneNumber = `+91${mobile}`; // Add country code
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowOtpInput(true);
        alert("OTP sent successfully!");
      })
      .catch((error) => {
        console.error("Error during signInWithPhoneNumber:", error);
        alert("Failed to send OTP. Please try again.");
      });
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        const user = result.user;
        console.log("User verified:", user);
        alert("User verified successfully!");
      })
      .catch((error) => {
        console.error("Error during OTP verification:", error);
        alert("Invalid OTP. Please try again.");
      });
  };

  return (
    <div>
      <h2>OTP Authentication</h2>

      {!showOtpInput && (
        <form onSubmit={sendOTP}>
          <div id="sign-in-button"></div>
          <input
            type="tel"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      )}

      {showOtpInput && (
        <form onSubmit={verifyOTP}>
          <input
            type="text"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
}

export default OTPForm;

// import React, { useState } from "react";
// import { getAuth, RecaptchaVerifier } from "firebase/auth";
// import { signInWithPhoneNumber } from "firebase/auth";

// const auth = getAuth();
// function Dummy() {
//   const [state, setState] = useState();
//   const [otp, setOtp] = useState()
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setState({ [name]: value });
//     console.log(e.target.value);
//   };

//   console.log(state);

//   const configureCapcha = () => {
//     window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
//       size: "invisible",
//       callback: (response) => {
//         // reCAPTCHA solved, allow signInWithPhoneNumber.
//         onSignInSubmit();
//         console.log("recapcha");
//       },
//       defaultCountry: "IN",
//     });
//   };

//   const onSignInSubmit = (e) => {
//     e.preventDefault();
//     configureCapcha();
//     const phoneNumber = "+91" + state.mobile;
//     console.log("phone number in onsigninsubmit", phoneNumber);
//     const appVerifier = window.recaptchaVerifier;
//     const auth = getAuth();
//     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//       .then((confirmationResult) => {
//         // SMS sent. Prompt user to type the code from the message, then sign the
//         // user in with confirmationResult.confirm(code).
//         window.confirmationResult = confirmationResult;
//         // ...
//         console.log("OTP sent");
//       })
//       .catch((error) => {
//         // Error; SMS not sent
//         // ...
//         console.log(error);
//       });
//   };

//   const onSubmitOTP = (e) => {
//     e.preventDefault()
//     const code = this.state.otp;
//     console.log(code);
//     window.confirmationResult
//       .confirm(code)
//       .then((result) => {
//         // User signed in successfully.
//         const user = result.user;
//         console.log(JSON.stringify(user));
//         alert("user verfied");
//         // ...
//       })
//       .catch((error) => {
//         // User couldn't sign in (bad verification code?)
//         // ...
//         console.log(error);
//       });
//   };
  
//   return (
//     <div>
//       <h2>login gorm </h2>
//       <form onSubmit={onSignInSubmit}>
//         <div id="sign-in-button"></div>

//         <input
//           type="number"
//           name="mobile"
//           onChange={handleChange}
//           placeholder="mobile number"
//           required
//         />
//         <button type="submit">Sumbit</button>
//       </form>

//       <h1>Enter OTP</h1>

//       <form onSubmit={onSubmitOTP}>
//         <input type="number" name="OTP" id="OTP" placeholder="OTP" required />
//         <button type="submit">Sumbit</button>
//       </form>
//     </div>
//   );
// }

// export default Dummy;
