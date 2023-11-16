import React from "react";
import { useParams } from "react-router-dom";
import Modal from "../modal";
import { useSelector } from "react-redux";

export default function PageMemberLetterDetail() {
  const localstorageLetters = useSelector((modules) => modules.modulesLetters);
  const { letterId } = useParams();
  const selectedLetter = localstorageLetters.find((letter) => letter.id === letterId);

  return (
    <>
      {/* 모달 */}
      <Modal selectedLetter={selectedLetter} />
    </>
  );
}
