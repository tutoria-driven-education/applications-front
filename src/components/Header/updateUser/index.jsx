import { Modal } from "@mui/material";
import {
  Form,
  FormTitle,
  ModalBox,
  ModalCloseButton,
  ModalWrapper,
  Row,
} from "./styles";
import { FaWindowClose } from "react-icons/fa";
import AuthContext from "../../../contexts/AuthContext";
import UserContext from "../../../contexts/UserContext";
import { Button, Input } from "../../FormData";
import { useContext, useEffect, useState } from "react";
import UsersService from "../../../services/UsersServices";
import { toast } from "react-toastify";

const UpdateUser = ({ opened, setOpened, name, logout }) => {
  const { token, setToken } = useContext(AuthContext);
  const { setName } = useContext(UserContext);
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState(name);
  const [disable, setDisable] = useState(true);

  const areRequiredFieldsFilled = nameInput && emailInput;

  useEffect(() => {
    setDisable(!areRequiredFieldsFilled);
  }, [nameInput, emailInput]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setNameInput(name);

    if (opened) {
      UsersService.getInfo(token)
        .then(({ data }) => {
          setNameInput(data.name);
          data.email && setEmailInput(data.email);
        })
        .catch((err) => {
          toast.error("Erro ao pegar os dados do usuário");
        });
    }
  }, [opened]);

  function handleUpdateUser(event) {
    event.preventDefault();
    console.log("update user");
    UsersService.putInfo(token, { name: nameInput, email: emailInput })
      .then(({ data }) => {
        logout();
        setOpened(false);
        toast.success("Dados do usuário atualizados com sucesso!");
      })
      .catch((error) => {
        console.log(error.response);
        toast.error("Erro ao atualizar os dados do usuário!");
      });
  }

  return (
    <Modal
      open={opened}
      onClose={() => setOpened(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox>
        <ModalCloseButton onClick={() => setOpened(false)}>
          <FaWindowClose color="black" size={20} />
        </ModalCloseButton>
        <ModalWrapper>
          <Form onSubmit={handleUpdateUser}>
            <FormTitle>Atualizar dados</FormTitle>
            <Row>
              <Input
                value={nameInput}
                setValue={setNameInput}
                label="Nome"
                placeholder="Nome"
                required={true}
              />
            </Row>
            <Row>
              <Input
                value={emailInput}
                setValue={setEmailInput}
                label="E-mail"
                type={"email"}
                placeholder="E-mail"
                required={true}
              />
            </Row>
            <Button disable={disable}>Salvar</Button>
          </Form>
        </ModalWrapper>
      </ModalBox>
    </Modal>
  );
};

export default UpdateUser;
