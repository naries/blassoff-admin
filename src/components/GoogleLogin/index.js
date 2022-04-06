import React from "react";
import { useGoogleLogin } from "react-google-login";


// refresh authentication token
import { refreshTokenSetup } from "../../helpers/refreshToken";
import GoogleIcon from "../../assets/landing/assets/images/google-icon.svg";

const clientId =
  "782023640781-hqm3po71ol9v06ep7utgi9oar08oo31u.apps.googleusercontent.com";

function LoginHooks() {
  const onSuccess = (res) => {
    // console.log("Login Success: currentUser:", res.profileObj);
    // alert(
    //   `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    // );
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    // console.log("Login failed: res:", res);
    // alert(
    //   `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    // );
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <button onClick={signIn} type="button" className="signup--google-btn">
      <img src={GoogleIcon} alt="google icon" /> Google
    </button>
  );
}

export default LoginHooks;
