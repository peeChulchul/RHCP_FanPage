import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Container as ContainerBox } from "components/box";
import LetterFrom from "../letterform";
import Letters from "../letters";
import { useSelector } from "react-redux";
import MemberCards from "page/common/member-cards";
import styled from "styled-components";

const Container = styled(ContainerBox)`
  padding: calc(var(--spacing) * 10) 0;
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 10);
  @media screen and (max-width: 1200px) {
    padding: calc(var(--spacing) * 10) calc(var(--spacing) * 4);
  }
`;

export default function PageMember() {
  const { name } = useParams();
  const localstorageLetters = useSelector((modules) => modules.modulesLetters);
  const selectedLetter = localstorageLetters.filter((letter) => letter.writedTo === name);
  const navigate = useNavigate();

  function onClickCard(memberName) {
    if (name === memberName) {
      return;
    }
    navigate(`./${memberName}`);
  }
  return (
    <section>
      <Container>
        <MemberCards onClickCard={onClickCard} />
        {name && <LetterFrom />}
        <Letters selectedLetter={selectedLetter.length > 0 ? selectedLetter : []}></Letters>
      </Container>
      <Outlet />
    </section>
  );
}
