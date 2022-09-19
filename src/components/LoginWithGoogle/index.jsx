import { useEffect, useRef } from "react";

const LoginWithGoogle = ({ callback }) => {
  const googleLogin = useRef();

  useEffect(() => {
    // Se não houver problemas futuros, pode ser excluído
    /*window.gapi.load("auth2", () => {
      const auth2 = window.gapi.auth2.init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      });
      auth2.signIn().then(console.log);
    });*/

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

  return <div ref={googleLogin} />;
};

export default LoginWithGoogle;
