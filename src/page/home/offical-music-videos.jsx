import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RxDot, RxDotFilled } from "react-icons/rx";
import { TextShadow } from "components/text";
import { officalMusicVideos } from "data/offical-music-videos";

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
  height: 600px;
  position: relative;
  border-radius: 16px;
  & iframe {
    border-radius: 16px;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
  }
`;

const DotBtns = styled.div`
  display: flex;
  gap: calc(var(--spacing) * 1);
  margin: calc(var(--spacing) * 2) auto;
  font-size: var(--font-lg);
  button {
    cursor: pointer;
    font-size: var(--font-lg);
  }
  path {
    fill: var(--color-primary-alt);
  }
`;

export default function OfficalMusicVIdeos() {
  const [viewPage, setViewPage] = useState(0);

  // useEffect(() => {
  //   const iframes = document.querySelectorAll(".iframe");
  //   iframes.forEach((iframe) => {
  //     console.log(iframe);
  //     iframe.contentWindow.postMessage('{"event":"command","func":"' + "stopVideo" + '","args":""}', "*");
  //   });
  // }, [viewPage]);

  return (
    <Container>
      <TextShadow>Offical Music Videos</TextShadow>

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
