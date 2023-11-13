import React from "react";
import styled from "styled-components";
import anthonyUrl from "assets/img/member/Anthony.webp";
import fleaUrl from "assets/img/member/Flea.webp";
import chadUrl from "assets/img/member/Chad.webp";
import johnUrl from "assets/img/member/John.webp";
import joshUrl from "assets/img/member/Josh.webp";
import { useNavigate, useParams } from "react-router-dom";

const MemberImgs = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: calc(var(--spacing) * 3);
  margin: calc(var(--spacing) * 4) 0;
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

export default function MemberCards() {
  const navigate = useNavigate();
  const { name } = useParams();

  function onClickCard(member) {
    if (name === member.name) {
      return navigate("/member");
    }
    navigate(`./${member.name}`);
  }

  const memberArray = [
    { url: anthonyUrl, name: "anthony" },
    { url: fleaUrl, name: "flea" },
    { url: chadUrl, name: "chad" },
    { url: johnUrl, name: "john" },
    { url: joshUrl, name: "josh" }
  ];

  return (
    <MemberImgs>
      {memberArray.map((member) => (
        <MemberCard
          onClick={() => onClickCard(member)}
          $slected={name === member.name}
          key={member.name}
          $bgUrl={member.url}
          alt="memberImg"
        />
      ))}
    </MemberImgs>
  );
}
