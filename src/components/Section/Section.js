import { StyledSection, SectionTitle } from "./Section.styles";

const Section = ({ children, title }) => (
  <StyledSection>
    <SectionTitle>{title}</SectionTitle>
    {children}
  </StyledSection>
);

export default Section;
