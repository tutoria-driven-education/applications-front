import { Button } from "@mui/material";
import styled from "styled-components";

const ItemContainer = styled.li`
  display: flex;
  flex-direction: column;
  background-color: var(--dark);
  border-radius: 2rem;
  padding: 1.5rem;
`;

const ItemHeader = styled.header`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ItemTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  background-color: var(--dark);
  height: fit-content;
`;

const MainContent = styled.main`
  display: grid;
  grid-template-columns: 1.75fr 1fr 0.5fr;
  gap: 1rem;

  @media (max-width: 875px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    & > section:last-child {
      grid-area: 2 / 2 / 3 / 3;
    }
    & > section:first-child {
      grid-area: 1 / 1 / 2 / 3;
    }
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`;

const ItemSection = styled.section`
  display: flex;
  flex-direction: column;
  background-color: var(--darker);
  min-width: 15rem;
  border-radius: 2rem;
  padding: 1rem;

  label,
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  label {
    width: 105%;
  }

  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    margin: 1rem 0 1rem 1rem;
    @media (max-width: 600px) {
      gap: 2rem;
    }
  }

  li {
    font-size: 1.8rem;
    display: flex;
    gap: 0.6rem;

    a {
      color: var(--driven-color);
      text-decoration: none;
      transition: color 0.3s;
      svg {
        margin-left: 0.5rem;
        transition: color 0.3s;
      }
      :visited {
        color: #5a0d33;
        svg {
          color: #5a0d33 !important;
        }
      }
      :hover {
        text-decoration: underline;
        color: #ffacd6;
        svg {
          color: #ffacd6 !important;
        }
      }
    }
  }
`;

const ItemSectionTitle = styled.h4`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
`;

const FinalizationButton = styled(Button)`
  margin: auto !important;
`;

export {
  ItemContainer,
  ItemTitle,
  ItemSection,
  ItemSectionTitle,
  ItemHeader,
  MainContent,
  FinalizationButton,
};
