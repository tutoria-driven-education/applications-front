import styled from "styled-components";

const StyledSection = styled.section`
  padding: 2rem;
  padding-top: 4.5rem;
  width: 100%;
  margin: 0 auto;
  min-height: 15rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  border: 0.15rem dashed var(--driven-color);
  border-radius: 2rem;
  max-width: 125rem;
  min-width: 65rem;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  color: #fff;
  position: absolute;
  top: -1.8rem;
  left: 4.2rem;
  background-color: #000;
  padding: 0 1rem;
`;

export { StyledSection, SectionTitle };
