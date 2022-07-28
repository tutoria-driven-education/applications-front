import styled from "styled-components";
import Fab from "@mui/material/Fab";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import AuthContext from "../../../../contexts/AuthContext";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import Applications from "../../../../services/ApplicationsService";

export default function DeleteButton({
  CompanyName,
  applicationId,
  updateApplications,
}) {
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const deleteCompanies = () => {
    Applications.deleteApplication(token, applicationId)
      .then(() => {
        setIsLoading(false);
        Swal.fire("Deletado!", "", "success");
        updateApplications();
      })
      .catch(() => {
        setIsLoading(false);
        toast.warn("Erro inesperado");
      });
  };

  const askForDeleteApplication = () => {
    Swal.fire({
      title: `Tem certeza que quer deletar a aplicação para ${CompanyName}?`,
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCompanies();
      }
    });
  };

  return (
    <Container size="small" onClick={askForDeleteApplication}>
      {isLoading ? Loader : <RiDeleteBin5Line />}
    </Container>
  );
}

const Container = styled(Fab)`
  font-weight: bold;
  text-transform: none !important;

  position: absolute !important;
  right: -1.5rem !important;
  top: -1.5rem !important;
`;

const Loader = <ThreeDots color="#FF7BBD" height={25} width={25} />;
