import { toast } from "react-toastify";

export default function validateMethod(navigate, isMentor, token, setToken) {
  const validations = allValidations(token);

  window.onstorage = (event) => {
    if (event.key === "token") {
      setToken(event.newValue);
    }
  };

  for (const condition of validations) {
    if (!condition.check) {
      if (condition.message) {
        toast(condition.message);
      }
      navigate(`${condition.to}`);
    }
  }
}

function allValidations(token) {
  return [
    {
      to: "/",
      check: !!token?.length,
      message: "Por favor, faça login!",
    },
  ];
}
