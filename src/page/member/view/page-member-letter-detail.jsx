import React from "react";
import { useParams } from "react-router-dom";
import LetterDetailModal from "../letterdetail-modal";
import { useSelector } from "react-redux";

export default function PageMemberLetterDetail() {
  const { letters } = useSelector((modules) => modules.modulesLetters);
  const { letterId } = useParams();

  const selectedLetter = letters.find((letter) => letter.id === letterId);

  return <LetterDetailModal selectedLetter={selectedLetter} />;
}
