import React from "react";
import { useParams } from "react-router-dom";
import LetterDetailModal from "../letterdetail-modal";
import { useSelector } from "react-redux";

export default function PageMemberLetterDetail() {
  const { letters, isLoading } = useSelector((modules) => modules.modulesLetters);
  const { letterId } = useParams();

  console.log(letters);
  const selectedLetter = letters?.find((letter) => letter.id === letterId);

  return <>{isLoading ? <>로딩중</> : <LetterDetailModal selectedLetter={selectedLetter} />}</>;
}
