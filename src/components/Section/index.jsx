import { StyledSection, SectionTitle } from "./styles";

const Section = ({ children, title }) => (
  <StyledSection>
    <SectionTitle>{title}</SectionTitle>
    {children}
  </StyledSection>
);

export default Section;
