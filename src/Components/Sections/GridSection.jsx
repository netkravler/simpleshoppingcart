import styled from "styled-components";

export const GridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ auto }) => auto || "auto-fit"}, minmax(${({ size }) => size || "250px"}, 1fr));
  gap: ${({ gap }) => gap || "1rem"};
`;
