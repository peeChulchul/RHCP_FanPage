import React from "react";
import { Outlet, useParams } from "react-router-dom";

import mockData from "data/mockdata.json";
import { Container } from "components/box";
import LetterFrom from "../letterform";
import useLocalstorage from "utils/hooks/useLocalstorage";
import Letters from "../letters";
import MemberCards from "../member-cards";

export default function PageMember() {
  const [localstorageLetters, setLocalstorageLetters] = useLocalstorage("letters", mockData);
  const { name } = useParams();
  const selectedLetter = localstorageLetters.filter((letter) => letter.writedTo === name);

  return (
    <section>
      <Container>
        {/* 맴버 이미지카드 */}
        <MemberCards />

        {/* 편지 입력폼 */}
        {name && (
          <LetterFrom
            selectedMember={name}
            localstorageLetters={localstorageLetters}
            setLocalstorageLetters={setLocalstorageLetters}
          />
        )}
        {/* 편지 미리보기 */}
        <Letters selectedLetter={selectedLetter.length > 0 ? selectedLetter : []}></Letters>
      </Container>
      <Outlet context={{ localstorageLetters, setLocalstorageLetters }} />
    </section>
  );
}
