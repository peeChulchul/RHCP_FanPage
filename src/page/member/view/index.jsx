import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { Container } from "components/box";
import LetterFrom from "../letterform";
import Letters from "../letters";
import MemberCards from "../member-cards";
import { useSelector } from "react-redux";

export default function PageMember() {
  const { name } = useParams();
  const localstorageLetters = useSelector((modules) => modules.modulesLetters);
  const selectedLetter = localstorageLetters.filter((letter) => letter.writedTo === name);

  return (
    <section>
      <Container>
        {/* 맴버 이미지카드 */}
        <MemberCards />
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
