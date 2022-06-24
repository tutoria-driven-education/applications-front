import styled from "styled-components";

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
  gap: 2rem;
  position: relative;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
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
`;

export { Form, Row, FormTitle };
