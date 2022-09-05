import styled from "styled-components";

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-width: 90%;
  max-height: 90%;
  background: #525268;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  border-radius: 2rem;
  padding: 1rem;

  &:focus-visible {
    outline: none;
  }
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 25px;
  transform: translate(50%, -50%);
  font-size: 2rem;
  background: transparent;
  border: transparent;
  cursor: pointer;
  outline: none;
`;

export { ModalBox, ModalCloseButton };
