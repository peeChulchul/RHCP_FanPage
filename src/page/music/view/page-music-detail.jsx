import { ImgCard } from "components/box";
import { TextShadow } from "components/text";
import { albumsDatas } from "data/albums";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-bottom: calc(var(--spacing) * 10);
  max-width: 650px;
`;

const AlbumArt = styled(ImgCard)`
  height: 500px;
  margin-bottom: calc(var(--spacing) * 5);
  width: 100%;
`;

const AlbumTitle = styled(TextShadow)`
  text-align: center;
`;

const TracksBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
`;

const Track = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 calc(var(--spacing) * 4);
  .name {
    flex: 1;
    margin-left: calc(var(--spacing) * 5);
    font-weight: bold;
    font-size: 1.1rem;
    color: var(--color-black);
  }
  .index {
    width: 20px;
    font-size: 1.1rem;
    color: var(--color-black);
    text-align: center;
  }
  .time {
    opacity: 0.7;
    color: var(--color-black);
    /* color: var(--color-black); */
  }
`;

export default function PageMusicDetail() {
  const { albumName } = useParams();
  const { name, url, tracks } = albumsDatas.find((album) => album.name === albumName);

  return (
    <Container>
      <AlbumTitle>{name}</AlbumTitle>
      <AlbumArt $bg={url} />
      <TracksBox>
        {tracks.map(({ name, length }, index) => (
          <Track key={name}>
            <p className="index">{index + 1}</p>
            <h1 className="name">{name}</h1>
            <p className="time">{length}</p>
          </Track>
        ))}
      </TracksBox>
    </Container>
  );
}
