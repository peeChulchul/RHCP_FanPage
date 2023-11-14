import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackDrop } from "components/box";
import Modal from "../modal";
import { useSelector } from "react-redux";

export default function LetterDetailPage() {
  const localstorageLetters = useSelector((modules) => modules.modulesLetters);
  const { name, letterId } = useParams();
  const selectedLetter = localstorageLetters.find((letter) => letter.id === letterId);
  const navigate = useNavigate();

  return (
    <>
      {/* 백드롭 */}
      <BackDrop onClick={() => navigate(`../${name}`)} />
      {/* 모달 */}
      <Modal selectedLetter={selectedLetter} />
    </>
  );
}
