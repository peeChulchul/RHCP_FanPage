import React from "react";
import OfficalMusicVIdeos from "../offical-music-videos";
import Albums from "../albums";
import { Container as ContainerBox } from "components/box";
import styled from "styled-components";
import Members from "../members";

const Container = styled(ContainerBox)`
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 8);
`;

export default function PageHome() {
  return (
    <section>
      <Container>
        <Members />
        <Albums />
        <OfficalMusicVIdeos />
      </Container>
    </section>
  );
}
