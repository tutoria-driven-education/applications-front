import { useContext, useState } from "react";
import AuthContext from "../../../contexts/AuthContext";
import CompaniesService from "../../../services/CompaniesServices";
import { toast } from "react-toastify";
import { FaClipboardList } from "react-icons/fa";
import { CompanyNameHolder, Container } from "./style";
import ClassesService from "../../../services/ClassesService";

export default function Class({ id, name }) {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const getLink = () => {
    if (isLoading) return;

    setIsLoading(true);
    ClassesService.getLinkParameters(id, token)
      .then(({ data }) => {
        const baseUrl = window.location.origin;
        const url = `${baseUrl}?m=${data.m}&c=${data.c}`;
        copyLinkToClipboard(url);

        setIsLoading(false);
      })
      .catch(() => {
        toast.warn("Erro inesperado");
        setIsLoading(false);
      });
  };

  function copyLinkToClipboard(link) {
    navigator.clipboard.writeText(link).then(
      () => {
        toast.success("Link copiado!");
      },
      (err) => {
        console.error("Não foi possível copiar o link...", err);
      }
    );
  }

  return (
    <Container onClick={() => getLink()}>
      <CompanyNameHolder>{name}</CompanyNameHolder>
      <FaClipboardList color="white" size={18} />
    </Container>
  );
}
