import styled from "styled-components";
import Loader from "../../Loader/Loader";

const Form = styled.form`
  background-color: var(--darker);
  width: 100%;
  min-width: 65rem;
  max-width: 125rem;
  padding: 4rem;
  padding-bottom: 3rem;
  margin: 0 auto;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  transition: height 1s;

  @media (max-width: 875px) {
    min-width: 100%;
  }

  @media (max-width: 600px) {
    padding: 2rem 2rem 3rem 2rem;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;

  @media (max-width: 875px) {
    display: flex;
    flex-direction: column;
  }
`;

const FormTitle = styled.h2`
  font-size: 3rem;
  color: #fff;
  position: absolute;
  top: -2.3rem;
  left: 4.2rem;
  background-color: var(--darker);
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  padding: 1rem;
  @media (max-width: 600px) {
    position: static;
    text-align: center;
  }
`;

const CustomLoader = styled(Loader)`
  position: absolute;
  margin: auto;
  background-color: red;
`;

export { Form, Row, FormTitle, CustomLoader };
