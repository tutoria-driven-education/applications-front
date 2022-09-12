import { useEffect, useRef } from "react";

const LoginWithGoogle = ({ callback }) => {
  const googleLogin = useRef();

  useEffect(() => {
    // eslint-disable-next-line no-undef
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: callback,
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
