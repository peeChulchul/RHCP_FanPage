import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { memberArray } from "data/member";
import { TextShadow } from "components/text";

const MemberImgs = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: calc(var(--spacing) * 3);

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const MemberInfo = styled(TextShadow)`
  position: absolute;
  z-index: 2;
  bottom: 5px;
  left: 5px;
  color: var(--color-primary);
  font-size: var(--font-md);
  line-height: 1.1;
  text-shadow: -2px 3px 0 var(--color-primary-alt);
  font-weight: bold;
  margin: 0;
  z-index: 1;
`;

const MemberCard = styled.div`
  position: relative;
  width: 100%;
  min-height: 350px;
  border: ${(props) => (props.$selected ? "10px solid var(--color-primary-alt)" : "")};
  transition: all 0.3s linear;
  cursor: ${(props) => (props.$selected ? "" : "pointer")};
  &:hover {
    transform: ${(props) => (props.$selected ? "" : "scale(0.9)")};
  }
  &:after {
    content: "";
    opacity: ${(props) => (props.$selected ? "1" : "0.6")};
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

export default function MemberCards({ onClickCard }) {
  const { name } = useParams();

  return (
    <MemberImgs>
      {memberArray.map((member) => (
        <MemberCard
          onClick={() => onClickCard(member.name)}
          $selected={name === member.name}
          key={member.name}
          $bgUrl={member.url}
          alt="memberImg"
        >
          <MemberInfo style={{}}>
            {member.name}
            <br />
            {member.position}
          </MemberInfo>
        </MemberCard>
      ))}
    </MemberImgs>
  );
}
