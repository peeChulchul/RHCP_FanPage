import React from "react";
import anthonyUrl from "assets/img/member/Anthony.webp";
import fleaUrl from "assets/img/member/Flea.webp";
import chadUrl from "assets/img/member/Chad.webp";
import johnUrl from "assets/img/member/John.webp";
import joshUrl from "assets/img/member/Josh.webp";
import styled from "styled-components";
import { Title } from "components/text";
import { useNavigate } from "react-router-dom";

const MemberImgs = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: calc(var(--spacing) * 3);
  margin: calc(var(--spacing) * 4) 0;
`;

const MemberInfo = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 2px;
  left: 3px;
  color: var(--color-primary);
  text-shadow: -2px 3px 0 var(--color-primary-alt);
  font-weight: bold;
`;

const MemberCard = styled.div`
  cursor: pointer;
  position: relative;
  width: 100%;
  min-height: 350px;
  transition: all 0.3s linear;
  &:hover {
    transform: scale(0.9);
  }
  &:before {
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

export default function Members() {
  const navigate = useNavigate();

  function onClickMember(name) {
    navigate(`/member/${name}`);
  }

  const memberArray = [
    { url: anthonyUrl, name: "Anthony", position: "Lead Vocal" },
    { url: fleaUrl, name: "Flea", position: "Base" },
    { url: chadUrl, name: "Chad", position: "Drum" },
    { url: johnUrl, name: "John", position: "Lead Guitar" },
    { url: joshUrl, name: "Josh", position: "Guitar/keyboard" }
  ];

  return (
    <div>
      <Title>Members</Title>
      <MemberImgs>
        {memberArray.map((member) => (
          <MemberCard onClick={() => onClickMember(member.name)} key={member.name} $bgUrl={member.url} alt="memberImg">
            <MemberInfo style={{}}>
              {member.name}
              <br />
              {member.position}
            </MemberInfo>
          </MemberCard>
        ))}
      </MemberImgs>
    </div>
  );
}
