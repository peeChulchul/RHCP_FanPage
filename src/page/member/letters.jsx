import React from "react";
import styled from "styled-components";
import Letter from "./letter";

const Container = styled.div`
  width: "100%";
  display: "grid";
  grid-template-columns: "repeat(4,minmax(0, 1fr))";
  gap: "12px";
`;

export default function Letters({ selectedLetter }) {
  return (
    <Container>
      {selectedLetter.map((letter) => (
        <Letter key={letter.id} letter={letter} />
      ))}
    </Container>
  );
}
