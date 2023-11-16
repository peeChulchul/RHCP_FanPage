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
        {/* 맴버 이미지카드 */}
        <MemberCards onClickCard={onClickCard} />
        {/* 편지 입력폼 */}
        {name && <LetterFrom />}
        {/* 편지 미리보기 */}
        <Letters selectedLetter={selectedLetter.length > 0 ? selectedLetter : []}></Letters>
      </Container>
      {/* 편지디테일모달 및 백드롭 */}
      <Outlet />
    </section>
  );
}
