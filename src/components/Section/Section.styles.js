import styled from "styled-components";

const StyledSection = styled.section`
  padding: 2rem;
  width: 90%;
  margin: 0 auto;
  min-height: 15rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  border: 1px dashed var(--darker);
  border-radius: 3.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.4rem;
  color: #fff;
  position: absolute;
  top: -1.3rem;
  left: 4.5rem;
  background-color: #000;
  padding: 0 1rem;
`;

export { StyledSection, SectionTitle };
