import { Title } from "components/text";
import React from "react";
import bloodSugarUrl from "assets/img/album/blood_sugar.webp";
import byTheWayUrl from "assets/img/album/by_the_way.jpg";
import CaliforniacationUrl from "assets/img/album/californiacation.jpg";
import freakyStyleyUrl from "assets/img/album/freaky_styley.jpg";
import getawayUrl from "assets/img/album/getaway.webp";
import headerArtUrl from "assets/img/album/header_art.avif";
import mortherMilkUrl from "assets/img/album/mother_milk.jpg";
import returnOfTheDreamUrl from "assets/img/album/return_of_the_dream.jpg";
import stadiumUrl from "assets/img/album/stadium.webp";
import theRHCPURL from "assets/img/album/the_red_hot_chili_peppers.jpg";
import unlimitedLoveUrl from "assets/img/album/unlimited_love.png";
import styled from "styled-components";

const Container = styled.div``;

const CardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 0 auto;
  gap: calc(var(--spacing) * 4);
`;

const Card = styled.div`
  background-image: ${(props) => `url(${props.$bg})`};
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 250px;
  border-radius: 12px;
`;
export default function Albums() {
  const albumUrls = [
    bloodSugarUrl,
    byTheWayUrl,
    CaliforniacationUrl,
    freakyStyleyUrl,
    getawayUrl,
    headerArtUrl,
    mortherMilkUrl,
    returnOfTheDreamUrl,
    stadiumUrl,
    theRHCPURL,
    unlimitedLoveUrl
  ];

  return (
    <Container>
      <Title>Albums</Title>
      <CardBox>
        {albumUrls.map((url) => (
          <Card key={url} $bg={url}></Card>
        ))}
      </CardBox>
    </Container>
  );
}
