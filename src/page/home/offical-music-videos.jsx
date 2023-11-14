import React, { useState } from "react";
import styled from "styled-components";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { Title } from "components/text";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 calc(var(--spacing) * 10);
  margin-bottom: calc(var(--spacing) * 10);
`;

const CarouselBox = styled.div`
  overflow: hidden;
  max-width: 1000px;
  border-radius: 16px;
  margin: 0 auto;
`;

const ArrowBtn = styled.button`
  position: absolute;
  top: 50%;
  font-size: var(--font-lg);
  cursor: pointer;
  svg {
    fill: var(--color-primary-alt);
  }
`;

const ArrowLeft = styled(ArrowBtn)`
  left: calc(0px);
`;
const ArrowRight = styled(ArrowBtn)`
  right: calc(0px);
  /* transform: translateX(-50%); */
  /* right: 50px; */
`;

const Viewer = styled.div`
  transition: all 0.4s ease-in-out;
  display: flex;
  transform: ${(props) => `translateX(calc( -100 * ${props.$viewPage}%))`};
`;

const Item = styled.div`
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

export default function OfficalMusicVIdeos() {
  const [viewPage, setViewPage] = useState(0);

  const playList = [
    { name: "Black Summer", id: "OS8taasZl8k" },
    { name: "Dani California", id: "Sb5aq5HcS1A" },
    { name: "Can't Stop", id: "8DyziWtkfBw" },
    { name: "Snow", id: "p0vM9iINl28" },
    { name: "Higher Ground", id: "eAi64gH07jM" },
    { name: "Dark Necessities", id: "Q0oIoR9mLwc" },
    { name: "Tell Me Baby", id: "oDNcL1VP3rY" },
    { name: "The Adventures of Rain Dance Maggie", id: "RtBbinpK5XI" },
    { name: "By The Way", id: "JnfyjwChuNU" }
  ];

  const onClickArrowBtn = (state) => {
    state === "next" ? setViewPage((prev) => prev + 1) : setViewPage((prev) => prev - 1);
  };

  return (
    <Container>
      <Title>Offical Music Videos</Title>
      {playList.length - 1 !== viewPage && (
        <ArrowRight onClick={() => onClickArrowBtn("next")}>
          <BiSolidRightArrow />
        </ArrowRight>
      )}
      {viewPage !== 0 && (
        <ArrowLeft onClick={() => onClickArrowBtn("prev")}>
          <BiSolidLeftArrow />
        </ArrowLeft>
      )}

      <CarouselBox>
        <Viewer $viewPage={viewPage}>
          {playList.map(({ name, id }) => (
            <Item key={name}>
              <iframe
                src={`https://www.youtube.com/embed/${id}?rel=0&vq=hd1080`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; 
                 encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Item>
          ))}
        </Viewer>
      </CarouselBox>
    </Container>
  );
}
