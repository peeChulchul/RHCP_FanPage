import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { memberArray } from "data/member";
import { TextShadow } from "components/text";

const MemberImgs = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: calc(var(--spacing) * 3);

  @media screen and (max-width: 800px) {
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

  @media (max-width: 400px) {
    font-size: 0.85rem;
  }
`;

const MemberCard = styled.div`
  position: relative;
  padding-bottom: 150%;
  width: 100%;
  border: ${(props) => (props.$selected ? "10px solid var(--color-primary-alt)" : "")};
  transition: all 0.3s linear;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px,
    rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
  cursor: ${(props) => (props.$selected ? "" : "pointer")};
  &:hover {
    transform: ${(props) => (props.$selected ? "" : "scale(0.9)")};
  }
  &:after {
    content: "";
    opacity: ${(props) => (props.$selected ? "1" : "0.6")};
    position: absolute;
    background-image: ${(props) => `url(${props.$bgUrl})`};
    background-size: cover;
    width: 100%;
    height: 100%;
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
