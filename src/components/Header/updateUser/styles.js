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
  z-index: 10;
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

const Form = styled.form`
  display: grid;
`;

const FormTitle = styled.h1`
  color: white;
  cursor: pointer;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  transition: color 0.3s;
  margin-bottom: 2rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 875px) {
    display: flex;
    flex-direction: column;
  }
`;

const ModalWrapper = styled.div`
  position: relative;
`;

const GoogleText = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;

  &:after {
    content: "*";
  }
`;

export {
  Form,
  FormTitle,
  ModalBox,
  ModalCloseButton,
  Row,
  ModalWrapper,
  GoogleText,
};
