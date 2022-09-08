import { useContext, useState } from "react";
import AuthContext from "../../../contexts/AuthContext";
import CompaniesService from "../../../services/CompaniesServices";
import { toast } from "react-toastify";
import { FaClipboardList } from "react-icons/fa";
import { CompanyNameHolder, Container } from "./style";

export default function Class({ id, name }) {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const getLink = () => {
    if (isLoading) return;

    setIsLoading(true);
    CompaniesService.changePartnership(id, token)
      .then((data) => {
        // TODO - colocar link recebido da api aqui
        copyLinkToClipboard("aaaaa");
        setIsLoading(false);
      })
      .catch(() => {
        toast.warn("Erro inesperado");
        setIsLoading(false);
      });
  };

  function copyLinkToClipboard(link) {
    navigator.clipboard.writeText(link);
    toast.success("Link copiado!");
  }

  return (
    <Container onClick={() => getLink()}>
      <CompanyNameHolder>{name}</CompanyNameHolder>
      <FaClipboardList color="white" size={18} />
    </Container>
  );
}
