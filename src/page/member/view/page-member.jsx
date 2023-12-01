import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Container as ContainerBox } from "components/box";
import LetterFrom from "../letterform";
import Letters from "../letters";
import { useDispatch, useSelector } from "react-redux";
import MemberCards from "page/common/member-cards";
import styled from "styled-components";
import { __getLetters } from "redux/modules/letter";

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
  const { isLoading, isError, error, letters } = useSelector((modules) => modules.modulesLetters);
  const dispatch = useDispatch();
  const selectedLetter = isLoading ? [] : letters.filter((letter) => letter.writedTo === name);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getLetters());
  }, [dispatch]);

  console.log("랜더링..");
  console.log(letters);
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
        {isLoading ? <>로딩중</> : <Letters selectedLetter={selectedLetter.length > 0 ? selectedLetter : []}></Letters>}
      </Container>
      <Outlet />
    </section>
  );
}
