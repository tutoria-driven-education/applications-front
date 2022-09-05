import { Modal } from "@mui/material";
import { ModalBox, ModalCloseButton } from "./styles";
import ItemInfo from "../ItemInfo";
import { FaWindowClose } from "react-icons/fa";

const CustomModal = (data) => {
  return (
    <Modal
      open={data.opened}
      onClose={() => data.setOpened(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox>
        <ModalCloseButton onClick={() => data.setOpened(false)}>
          <FaWindowClose color="black" size={20} />
        </ModalCloseButton>
        <ItemInfo {...data} />
      </ModalBox>
    </Modal>
  );
};

export default CustomModal;
