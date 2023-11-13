import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import { BackDrop } from "components/box";
import Modal from "../modal";

export default function LetterDetailPage() {
  const { localstorageLetters, setLocalstorageLetters } = useOutletContext();

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
