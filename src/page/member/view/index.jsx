import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import anthonyUrl from "assets/img/member/Anthony.webp";
import fleaUrl from "assets/img/member/Flea.webp";
import chadUrl from "assets/img/member/Chad.webp";
import johnUrl from "assets/img/member/John.webp";
import joshUrl from "assets/img/member/Josh.webp";
import mockData from "data/mockdata.json";
import { Container } from "components/box";
import LetterFrom from "../letterform";
import useLocalstorage from "utils/hooks/useLocalstorage";
import Letters from "../letters";

const MemberImgs = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
`;

const MemberCard = styled.div`
  position: relative;
  width: 100%;
  min-height: 350px;
  border: 10px solid transparent;
  border-color: ${(props) => (props.$slected ? "var(--color-primary-alt)" : "")};
  transition: all 0.3s linear;
  &:hover {
    border-color: ${(props) => (props.$slected ? "var(--color-accent)" : "var(--color-primary-alt)")};
    transform: ${(props) => (props.$slected ? "" : "scale(0.9)")};
  }
  &:after {
    content: "";
    opacity: ${(props) => (props.$slected ? "1" : "0.6")};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${(props) => `url(${props.$bgUrl})`};
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }
`;

export default function PageMember() {
  const [selectedMember, setSelectedMember] = useState();
  const [localstorageLetters, setLocalstorageLetters] = useLocalstorage("letters", mockData);
  const { name } = useParams();
  const selectedLetter = localstorageLetters.filter((letter) => letter.writedTo === name);
  const navigate = useNavigate();

  const memberArray = [
    { url: anthonyUrl, name: "anthony" },
    { url: fleaUrl, name: "flea" },
    { url: chadUrl, name: "chad" },
    { url: johnUrl, name: "john" },
    { url: joshUrl, name: "josh" }
  ];

  // const memberData = [
  //   { name: "anthony", position: "보컬" },
  //   { name: "flea", position: "베이스" },
  //   { name: "chad", position: "드럼" },
  //   { name: "john", position: "기타" },
  //   { name: "josh", position: "기타,키보드" }
  // ];

  useEffect(() => {
    setSelectedMember(name);
  }, [name]);

  return (
    <section>
      <Container>
        {/* 맴버 이미지카드 */}
        <MemberImgs>
          {memberArray.map((member) => (
            <MemberCard
              onClick={() => navigate(`./${member.name}`)}
              $slected={name === member.name}
              key={member.name}
              $bgUrl={member.url}
              alt="memberImg"
            />
          ))}
        </MemberImgs>

        {/* 편지 입력폼 */}
        <LetterFrom
          selectedMember={selectedMember}
          localstorageLetters={localstorageLetters}
          setLocalstorageLetters={setLocalstorageLetters}
        />

        {/* 편지 미리보기 */}
        <Letters selectedLetter={selectedLetter.length > 0 ? selectedLetter : []}></Letters>
      </Container>
      <Outlet context={{ localstorageLetters, setLocalstorageLetters }} />
    </section>
  );
}
