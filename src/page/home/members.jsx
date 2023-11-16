import React from "react";
import { TextShadow } from "components/text";
import { useNavigate } from "react-router-dom";
import MemberCards from "page/common/member-cards";
import { windowScroll } from "utils/window-scorll";

export default function Members() {
  const navigate = useNavigate();

  function onClickCard(name) {
    windowScroll(400);
    navigate(`/Member/${name}`);
  }

  return (
    <section>
      <TextShadow>Members</TextShadow>
      <MemberCards onClickCard={onClickCard} />
    </section>
  );
}
