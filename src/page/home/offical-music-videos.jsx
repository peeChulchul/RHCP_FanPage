import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RxDot, RxDotFilled } from "react-icons/rx";
import { TextShadow } from "components/text";
import { officalMusicVideos } from "data/offical-music-videos";
import { MiniTitle } from "page/music/view/page-music";

const Container = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  margin-bottom: calc(var(--spacing) * 10);
`;

const CarouselBox = styled.div`
  overflow: hidden;
  border-radius: 16px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Viewer = styled.div`
  transition: all 0.4s ease-in-out;
  display: flex;
  transform: ${(props) => `translateX(calc( -100 * ${props.$viewPage}%))`};
`;

const MusicVideo = styled.div`
  flex-shrink: 0;
  width: 100%;
  padding-bottom: 56.25%;
  position: relative;
  border-radius: 16px;
  & iframe {
    border-radius: 16px;
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;

const DotBtns = styled.div`
  display: flex;
  gap: calc(var(--spacing) * 1);
  margin: calc(var(--spacing) * 2) auto;
  font-size: var(--font-lg);
  button {
    cursor: pointer;
  }
  svg {
    width: 40px;
    height: 40px;
  }
  path {
    fill: var(--color-primary-alt);
  }
`;

export default function OfficalMusicVIdeos() {
  const [viewPage, setViewPage] = useState(0);

  return (
    <Container>
      <MiniTitle>Offical Music Videos</MiniTitle>

      <CarouselBox>
        <Viewer $viewPage={viewPage}>
          {officalMusicVideos.map(({ name, id }) => (
            <MusicVideo key={id}>
              <iframe
                className="iframe"
                src={`https://www.youtube.com/embed/${id}?rel=0&vq=hd1080`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; 
                 encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </MusicVideo>
          ))}
        </Viewer>
        <DotBtns>
          {officalMusicVideos.map(({ name, id }, index) =>
            viewPage === index ? (
              <RxDotFilled key={id} />
            ) : (
              <button key={id} onClick={() => setViewPage(index)}>
                <RxDot />
              </button>
            )
          )}
        </DotBtns>
      </CarouselBox>
    </Container>
  );
}
