import { useEffect, useRef } from "react";

import jwt_decode from "jwt-decode";

const LoginWithGoogle = () => {
  const googleLogin = useRef();

  function handleCallbackResponse(res) {
    const user = jwt_decode(res.credential);
    console.log(user)
  }

  useEffect(() => {
    // eslint-disable-next-line no-undef
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    // eslint-disable-next-line no-undef
    google.accounts.id.renderButton(googleLogin.current, {
      theme: "outline",
      size: "large",
    });
  }, []);

  return <div ref={googleLogin}></div>;
};

export default LoginWithGoogle;
