import { Container, ImgCard } from "components/box";
import { TextShadow } from "components/text";
import { albumsDatas } from "data/albums";
import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { windowScroll } from "utils/window-scorll";

const AlbumBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin: calc(var(--spacing) * 10) 0; */
  & > div {
    display: grid;
    grid-template-columns: repeat(4, minmax(100px, 200px));
    gap: calc(var(--spacing) * 6);
  }

  @media screen and (max-width: 1200px) {
    & > div {
      grid-template-columns: repeat(3, minmax(100px, 200px));
    }
  }
  @media screen and (max-width: 600px) {
    & > div {
      grid-template-columns: repeat(2, minmax(100px, 200px));
    }
  }
`;

const AlbumCard = styled(ImgCard)`
  border-radius: 0px;
  /* height: 200px; */
  cursor: pointer;
  transition: all 0.3s linear;
  &:hover {
    transform: scale(0.9);
  }
`;

export const MiniTitle = styled(TextShadow)`
  font-size: var(--font-lg);

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

export default function PageMusic() {
  const param = useParams();
  const navigate = useNavigate();

  const onClickAlbumCard = (name) => {
    windowScroll(400);
    navigate(`./${name}`);
  };

  return (
    <Container>
      <Outlet />

      <AlbumBox>
        <MiniTitle>Albums</MiniTitle>
        <div>
          {albumsDatas.map(({ name, url }) =>
            param.albumName === name ? null : (
              <AlbumCard onClick={() => onClickAlbumCard(name)} key={url} $bg={url}></AlbumCard>
            )
          )}
        </div>
      </AlbumBox>
    </Container>
  );
}
