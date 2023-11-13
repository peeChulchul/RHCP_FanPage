import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackDrop } from "components/box";
import Modal from "../modal";
import { useMemberContext } from "context/member-context";

export default function LetterDetailPage() {
  const { localstorageLetters, setLocalstorageLetters } = useMemberContext();
  const { name, letterId } = useParams();
  const selectedLetter = localstorageLetters.find((letter) => letter.id === letterId);
  const navigate = useNavigate();

  return (
    <>
      <BackDrop onClick={() => navigate(`../${name}`)} />
      <Modal selectedLetter={selectedLetter} setLocalstorageLetters={setLocalstorageLetters} />
    </>
  );
}
