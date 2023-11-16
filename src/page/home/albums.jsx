import { TextShadow } from "components/text";
import React from "react";
import styled from "styled-components";
import { albumsDatas } from "data/albums";
import { ImgCard } from "components/box";
import { useNavigate } from "react-router-dom";
import { windowScroll } from "utils/window-scorll";

const CardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 0 auto;
  gap: calc(var(--spacing) * 4);
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const AlbumBox = styled(ImgCard)`
  transition: all 0.3s linear;
  &:hover {
    transform: scale(0.9);
  }
`;

export default function Albums() {
  const navigate = useNavigate();
  const onClickAlbumCard = (name) => {
    windowScroll(400);
    navigate(`/Music/${name}`);
  };
  return (
    <section>
      <TextShadow>Albums</TextShadow>
      <CardBox>
        {albumsDatas.map(({ name, url }) => (
          <AlbumBox onClick={() => onClickAlbumCard(name)} key={url} $bg={url}></AlbumBox>
        ))}
      </CardBox>
    </section>
  );
}
