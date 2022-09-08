import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 6rem);

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #000;
`;

export const AuthWrapper = styled.div`
  padding: 24px;
  border-radius: 16px;
  border: 1px dashed var(--driven-color);

  position: relative;
`;

export const AuthLabel = styled.div`
  padding: 0 8px;

  position: absolute;

  top: -16px;
  left: 24px;

  font-size: 32px;
  color: #fff;

  background-color: #000;
`;
