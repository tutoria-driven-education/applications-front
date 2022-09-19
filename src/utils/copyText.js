import { toast } from "react-toastify";

export default function copyText(text, textTypeWithPronoun) {
  const substantive = textTypeWithPronoun.split(" ").slice(1).join(" ");

  navigator.clipboard.writeText(text).then(
    () => {
      toast.success(
        `${substantive[0].toUpperCase() + substantive.slice(1)} copiado`
      );
    },
    (err) => {
      toast.error(`Não foi possível copiar ${textTypeWithPronoun}`);
      console.error(`Não foi possível copiar ${textTypeWithPronoun}`, err);
    }
  );
}
